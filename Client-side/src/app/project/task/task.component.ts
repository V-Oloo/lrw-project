
import { CommentDTO } from './../../../../../server/src/comments/dto/create-comment.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: []
})
export class TaskComponent implements OnInit {
  today = new Date();
  CommentForm: FormGroup;
  employees: [];
  loading = false;
  public errMessage: string;
  comments: [];
  total;


  Tasks: [];
  Employees: [];
  name; description; startDate; endDate; status; street; city; state; zipCode;

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private auth: AuthenticationService,
    private message: NzMessageService,
    private _route: ActivatedRoute,
    ) { }

    id = +this._route.snapshot.paramMap.get('id');
    currentUser = this.auth.currentUserValue;
    empId = this.currentUser.user_id;

  ngOnInit(): void {

    this.projectService.getProjectTaskInfo(this.id).subscribe((res: any) => {

        this.Tasks = res.tasks;
        this.name = res.task_name;
        this.description = res.task_description;
        this.status = res.task_status;
        this.endDate = res.task_plannedEndDate;
        this.street = res.task_street;
        this.city = res.task_city;
        this.state = res.task_state;
        this.zipCode = res.task_zipCode;
        this.employees = res.employees;

    });

    this.projectService.getTaskComments(this.id).subscribe((res: any) => {
         this.comments = res;
         this.total = this.comments.length;
    });

   this.CommentForm = this.fb.group({
     comment: [null, [Validators.required]],
     emp_id: [this.empId],
   });

  }

  addComment(data : Comment) {
    if (this.CommentForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    this.projectService.addComment(this.id, data).subscribe((res:any) => {
      this.loading = false;
      this.loading = false;
      console.log(res);
      this.message.create('success', `Task added successfully`);
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );
  }

  displayValidationErrors() {
    for (const i in this.CommentForm.controls) {
      this.CommentForm.controls[ i ].markAsDirty();
      this.CommentForm.controls[ i ].updateValueAndValidity();
    }
  }


}
