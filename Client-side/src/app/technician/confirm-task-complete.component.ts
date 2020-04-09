import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from '../shared/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';


@Component({
  selector: 'app-confirm-task-complete',
  templateUrl: './confirm-task-complete.component.html',
  styles: []
})
export class ConfirmTaskCompleteComponent implements OnInit {

  today = new Date();
  loading = false;
  task;workStart;workEnd
  public errMessage: string;
  start; stop; total;
  constructor(
    private _route: ActivatedRoute,
    private projectService: ProjectService,
    private auth: AuthenticationService,
    private message: NzMessageService,
    private _router: Router,
    private fb: FormBuilder,
  ) { }

  JobForm: FormGroup;
 currentUser = this.auth.currentUserValue;
 empId = this.currentUser.user_id;

  id = +this._route.snapshot.paramMap.get('id');
  flaggers;

  ngOnInit(): void {
     this.projectService.getFlaggerNo(this.id).subscribe((res:any) => {
        this.flaggers = res.flaggers;
        this.getFlaggers(this.flaggers);
     });

     this.projectService.getTaskById(this.id).subscribe(res => {
      this.task = res;
      this.workStart = this.task.workStart;
      this.workEnd = this.task.workEnd;
      this.updateTime(this.workEnd,this.workStart);
     });

    this.JobForm = this.fb.group({
      cones: [null,[Validators.required] ],
      flaggers: [null,[Validators.required]],
      signs: [null,[Validators.required]],
      boards: [null,[Validators.required]],
      startedAt:[null, [Validators.required]],
      endedAt:[null, [Validators.required]],
      totalTime:[{value: 0,disabled: true}],
  });
  }

  getFlaggers(data) {
    this.JobForm.patchValue({
      flaggers: data
    });
  }

  updateTime(end, start){
    this.JobForm.patchValue({
      startedAt: start,
      endedAt: end
    });
    this.updateTtim(end, start)
  }

  updateTtim(end, start){
    const time = ((new Date(end).valueOf()) - (new Date(start).valueOf()));
    const actualTime = Math.round(time/3600000)
    this.JobForm.patchValue({
      totalTime: actualTime,
    });
  }

  submitJobForm() {
    if (this.JobForm.invalid) {
      this.displayTaskFormValidationErrors();
      return;
    }
    this.loading = true;

    const cones = this.JobForm.value.cones;
    const flaggers = this.JobForm.value.flaggers;
    const signs = this.JobForm.value.signs;
    const boards = this.JobForm.value.boards;
    const fstartTime = this.JobForm.value.startedAt
    const fendTime = this.JobForm.value.endedAt

    const time = ((new Date(fendTime).valueOf()) - (new Date(fstartTime).valueOf()));
    const actualTime = Math.round(time/3600000)

    const job = {cones: cones, flaggers: flaggers, signs: signs, boards: boards,
                 total_hours: actualTime, fworkStart: fstartTime, fworkEnd: fendTime}

    this.projectService.patchTaskData(this.id, job).subscribe((res:any) =>{
      this.loading = false;

      this.message.create('success', `Task updated successfully`);
      this._router.navigate(['technician/comment', this.id])
    } ,(error) => {
      this.loading = false;
      this.errMessage = error.error.message;
    });

  }


  displayTaskFormValidationErrors() {
    for (const i in this.JobForm.controls) {
      this.JobForm.controls[ i ].markAsDirty();
      this.JobForm.controls[ i ].updateValueAndValidity();
    }
  }

  onChange(result: Date): void {
    const start = result;
    const time = ((new Date(this.JobForm.value.endedAt).valueOf()) - (new Date(start).valueOf()));
    const actualTime = Math.round(time/3600000)
    this.JobForm.patchValue({
      totalTime: actualTime,
    });
  }

  onChangeEnd(result: Date): void{
    const end = result;
    const time = ((new Date(end).valueOf()) - (new Date(this.JobForm.value.startedAt).valueOf()));
    const actualTime = Math.round(time/3600000)
    this.JobForm.patchValue({
      totalTime: actualTime,
    });
  }

  onOk(result: Date): void {
      console.log('onOk', result);
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
 };

}
