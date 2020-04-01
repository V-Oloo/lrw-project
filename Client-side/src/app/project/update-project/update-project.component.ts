import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styles: []
})
export class UpdateProjectComponent implements OnInit {

  ProjectForm: FormGroup;
  loading = false;
  public errMessage: string;
  endOpen: boolean = false;
  customers: [];

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private customerService: CustomerService,
    private message: NzMessageService,
    private router: Router,
    private _route: ActivatedRoute,
    ) { }

    id = +this._route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((res:any) => {
       this.customers = res;
       console.log(res);
    });

    this.projectService.getProject(this.id).subscribe((res:any) => {
      this.editProject(res);
      console.log(res);
    });

    this.ProjectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      cone_rate: [null,[Validators.required] ],
      flagger_rate: [null,[Validators.required]],
      sign_rate: [null,[Validators.required]],
      boards_rate: [null,[Validators.required]],
      min_hours: [null,[Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      customerId: [null , [Validators.required]],
  });
  }


  UpdateProject() {

    const data = this.ProjectForm.value;

    if (this.ProjectForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    console.log(this.ProjectForm.value);
    this.loading = true
    this.projectService.updateProject(data, this.id).subscribe((res:any) => {
      this.loading = false;
      this.message.create('success', `project updated successfully`);
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

  // date picker
  onStartChange(date: Date): void {
    this.ProjectForm.patchValue({
      startDate: date,
     });
}

onEndChange(date: Date): void {
  this.ProjectForm.patchValue({
    endDate: date,
   });
}

handleStartOpenChange(open: boolean): void {
    if (!open) {
        this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
}

handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
}

editProject (data: Project) {
  console.log(data);
  this.ProjectForm.patchValue({
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    customerId: data.customerId,
    cone_rate: data.cone_rate,
    flagger_rate: data.flagger_rate,
    sign_rate: data.sign_rate,
    boards_rate: data.boards_rate,
    min_hours: data.min_hours,
  });
}

}
