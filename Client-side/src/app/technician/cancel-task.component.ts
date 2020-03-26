import { User } from './../shared/interfaces/user.type';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-cancel-task',
  templateUrl: './cancel-task.component.html',
  styles: []
})
export class CancelTaskComponent implements OnInit {

  CommentForm: FormGroup;
  submitting = false;
  loading = false;
  public errMessage: string;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private projectService: ProjectService,
    private auth: AuthenticationService,
    private message: NzMessageService,
    private _router: Router
    ) { }

    id = +this._route.snapshot.paramMap.get('id');
    task: any;
    name; street; state; city; zipCode; createdBy;

  ngOnInit(): void {

    this.projectService.getTaskById(this.id).subscribe((res: any) => {
      this.task = res;
      this.name = this.task.name;
      this.street = this.task.street;
      this.city = this.task.city;
      this.state = this.task.state;
      this.zipCode = this.task.zipCode;
      this.createdBy= this.task.createdBy

    });

    const event = "Task Cancelled"
    const status= "UNREAD"
    this.CommentForm = this.fb.group({
      event : [event],
      message: [null, [Validators.required]],
      user: [this.createdBy],
      status: [status],
  });
  }

  addComment() {
    if (this.CommentForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    const reason = this.CommentForm.value.message;
    const event = this.CommentForm.value.event;
    const user = this.CommentForm.value.user;
    const status = this.CommentForm.value.status;

    const message = "The task " + "" + this.name + " " + "at " + this.street + ','
                      + this.city + ' ' + this.state + ' ' + this.zipCode + ' '
                      + "has been cancelled. Reason being: " + reason;
    const data = {message: message,event: event, status: status, user:user };

   const result = this.projectService.addNotification(data).subscribe((res:any) => {
      this.loading = false;
      this.message.create('success', `Task Cancelled`);
      this._router.navigateByUrl('/technician')
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
    }
    );

    if(result) {
      this.cancelTask(this.id);
    }
  }

  displayValidationErrors() {
    for (const i in this.CommentForm.controls) {
      this.CommentForm.controls[ i ].markAsDirty();
      this.CommentForm.controls[ i ].updateValueAndValidity();
    }
  }

  cancelTask(taskId: number) {
    this.projectService.startTask(taskId, {status: "CANCELLED"}).subscribe((res:any) => {
      console.log('task cancelled');
    }, (err: any) => {
      console.log(err);
    });
  }


}
