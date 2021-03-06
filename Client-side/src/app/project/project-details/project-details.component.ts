import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee/employee.service';
import { TaskModel } from 'src/app/models/task.model';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styles: []
})
export class ProjectDetailsComponent implements OnInit {
  today = new Date();
  checked: boolean = false;
  customersList: [];
  TaskForm: FormGroup;
  customers: [];
  employees: [];
  loading = false;
  public errMessage: string;
  endOpen: boolean = false;
  total;

  Tasks: [];
  name; description; startDate; endDate; status;
  public mask = [/\d/, /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private customerService: CustomerService,
    private empService: EmployeeService,
    private message: NzMessageService,
    private auth: AuthenticationService,
    private router: Router,
    private _route: ActivatedRoute,
    ) { }

    id = +this._route.snapshot.paramMap.get('id');
    currentUser = this.auth.currentUserValue
    userId = +this.currentUser.user_id;


  ngOnInit(): void {

    this.customerService.getCustomers().subscribe((res:any) => {
      this.customers = res;
   });

   this.projectService.getProjectTasks(this.id).subscribe((res:any) =>{
        this.Tasks = res.tasks;
        console.log(this.Tasks);
        this.total = this.Tasks.length;
        this.name = res.name;
        this.description = res.description;
        this.status = res.status;
        this.endDate = res.endDate;

   });

   this.empService.getAssignableEmployees().subscribe((res:any) => {
        console.log(res)
        this.employees = res.data;
   });

   this.TaskForm = this.fb.group({
     plannedStartDate: [null, [Validators.required]],
     plannedEndDate: [null, [Validators.required]],
     street: [null, [Validators.required]],
     zipCode: [null, [Validators.required]],
     city: [null, [Validators.required]],
     state: [null, [Validators.required]],
     flaggers: [null, [Validators.required]],
     createdBy: [this.userId]
 });

  }

  addTask(data : TaskModel) {
    if (this.TaskForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    this.projectService.addTask(this.id, data).subscribe((res:any) => {
      this.loading = false;
      this.message.create('success', `Job added successfully`);
      window.location.reload();
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );
  }

onChange(result: Date): void {
    //console.log('Selected Time: ', result);
}

onOk(result: Date): void {
    //console.log('onOk', result);
}

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
 };

  displayValidationErrors() {
    for (const i in this.TaskForm.controls) {
      this.TaskForm.controls[ i ].markAsDirty();
      this.TaskForm.controls[ i ].updateValueAndValidity();
    }
  }


}
