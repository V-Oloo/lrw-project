import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from 'src/app/models/project.model';
import { CustomerService } from 'src/app/customer/customer.service';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styles: [
    `
        nz-date-picker, nz-month-picker, nz-range-picker, nz-week-picker {
            margin: 0 8px 12px 0;
        }
        .border{
            border: 1px solid #1890ff;
            border-radius: 100%;
        }
    `
  ]
})
export class AddProjectComponent implements OnInit {
  today = new Date();
  ProjectForm: FormGroup;
  loading = false;
  public errMessage: string;
  endOpen: boolean = false;
  customers: [];

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private customerService: CustomerService,
    private message: NzMessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const status = 'ACTIVE'
    this.customerService.getCustomers(status).subscribe((res:any) => {
       this.customers = res;
    });
    this.ProjectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      customerId: [null , [Validators.required]],
  });
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


  addProject() {

    const data = this.ProjectForm.value;
    const customerId = +data.customerId
    const projectInfo: Project = {name: data.name, description: data.description, startDate: data.startDate, endDate:data.endDate}

    if (this.ProjectForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    this.projectService.addProject(projectInfo, customerId).subscribe((res:any) => {
      this.loading = false;
      this.loading = false;
      this.message.create('success', `project added successfully`);
      this.router.navigate(['/projects']);
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );
  }

  displayValidationErrors() {
    for (const i in this.ProjectForm.controls) {
      this.ProjectForm.controls[ i ].markAsDirty();
      this.ProjectForm.controls[ i ].updateValueAndValidity();
    }
  }

}
