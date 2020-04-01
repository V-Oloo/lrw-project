import { Comment } from './../../../../server/src/models/comment.entity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-task-complete',
  templateUrl: './confirm-task-complete.component.html',
  styles: []
})
export class ConfirmTaskCompleteComponent implements OnInit {

  loading = false;
  public errMessage: string;
  constructor(
    private _route: ActivatedRoute,
    private projectService: ProjectService,
    private auth: AuthenticationService,
    private message: NzMessageService,
    private _router: Router,
    private datePipe: DatePipe,
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

    this.JobForm = this.fb.group({
      comment: [null, [Validators.required]],
      cones: [null,[Validators.required] ],
      flaggers: [null,[Validators.required]],
      signs: [null,[Validators.required]],
      boards: [null,[Validators.required]],
      total_hours: [null,[Validators.required]],
  });
  }

  getFlaggers(data) {
    this.JobForm.patchValue({
      flaggers: data
    });
  }

  submitJobForm() {
    if (this.JobForm.invalid) {
      this.displayTaskFormValidationErrors();
      return;
    }
    this.loading = true;
    const comment = this.JobForm.value.comment
    const cones = this.JobForm.value.cones;
    const flaggers = this.JobForm.value.flaggers;
    const signs = this.JobForm.value.signs;
    const boards = this.JobForm.value.boards;
    const total_hours = this.JobForm.value.total_hours

    const Commdata = {comment: comment, emp_id: this.empId}
    const job = {cones: cones, flaggers: flaggers, signs: signs, boards: boards, total_hours: total_hours}

    this.projectService.patchTaskData(this.id, job).subscribe((res:any) =>{
      this.loading = false;
      this.addComment(Commdata)
      this.message.create('success', `Task updated successfully`);
      this._router.navigate(['technician/comment', this.id])
    } ,(error) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    });

    console.log(this.JobForm.value)
  }

  displayTaskFormValidationErrors() {
    for (const i in this.JobForm.controls) {
      this.JobForm.controls[ i ].markAsDirty();
      this.JobForm.controls[ i ].updateValueAndValidity();
    }
  }

  addComment(data) {
   const result = this.projectService.addComment(this.id, data).subscribe((res:any) => {
      console.log(res);
    },
    (error: any) => {
      console.log(error);
    }
    );

  }

}
