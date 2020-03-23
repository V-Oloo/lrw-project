import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styles: []
})
export class CommentComponent implements OnInit {
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
    currentUser = this.auth.currentUserValue;
    empId = this.currentUser.user_id;

  ngOnInit(): void {

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
   const result = this.projectService.addComment(this.id, data).subscribe((res:any) => {
      this.loading = false;
      this.message.create('success', `Comment added successfully`);
      this._router.navigate(['technician/task-summary', this.id])
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );

    if(result) {
      this.completeTask(this.id);
    }

  }

  displayValidationErrors() {
    for (const i in this.CommentForm.controls) {
      this.CommentForm.controls[ i ].markAsDirty();
      this.CommentForm.controls[ i ].updateValueAndValidity();
    }
  }

  completeTask(taskId: number) {
    this.projectService.startTask(taskId, {status: "COMPLETE"}).subscribe((res:any) => {
      console.log('task completed');
    }, (err: any) => {
      console.log(err);
    });
  }

}
