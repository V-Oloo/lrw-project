import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { EmployeeService } from 'src/app/employee/employee.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styles: []
})
export class UpdateTaskComponent implements OnInit {
  today = new Date();

  TaskForm: FormGroup;
  employees: [];

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private message: NzMessageService,
    private router: Router,
    private _route: ActivatedRoute,
    private empService: EmployeeService,
    ) { }

  id = +this._route.snapshot.paramMap.get('id');
  loading = false;
  public errMessage: string;
  emps;

  ngOnInit(): void {

    this.projectService.getProjectTaskInfo(this.id).subscribe((res: any) => {
      this.editTask(res);
    });

    this.empService.getAssignableEmployees().subscribe((res:any) => {
      this.employees = res;
    });


    this.TaskForm = this.fb.group({
      plannedStartDate: [null, [Validators.required]],
      plannedEndDate: [null, [Validators.required]],
      street: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      flaggers: [null, [Validators.required]],
  });
  }


  editTask (data) {

   var arr = [];
   _.forOwn(data.employees, function(value) {
       arr.push(value.empId)
    });

    this.TaskForm.patchValue({
      plannedStartDate:  data.task_plannedStartDate,
      plannedEndDate: data.task_plannedEndDate,
      street: data.task_street,
      zipCode: data.task_zipCode,
      city: data.task_city,
      state: data.task_state,
      flaggers: arr,
    });

  }

  updateTask() {
    if (this.TaskForm.invalid) {
      this.displayTaskFormValidationErrors();
      return;
    }
    this.loading = true;
    this.projectService.updateTask(this.id, this.TaskForm.value).subscribe((res:any) =>{
      this.loading = false;
      this.message.create('success', `Task updated successfully`);
      this.router.navigate(['/projects']);
    } ,(error) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    });

    console.log(this.TaskForm.value)
  }


  displayTaskFormValidationErrors() {
    for (const i in this.TaskForm.controls) {
      this.TaskForm.controls[ i ].markAsDirty();
      this.TaskForm.controls[ i ].updateValueAndValidity();
    }
  }

onChange(result: Date): void {
    console.log('Selected Time: ', result);
}

onOk(result: Date): void {
    console.log('onOk', result);
}

disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
 };



}
