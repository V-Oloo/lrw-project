import { CommentDTO } from './../../../../../server/src/comments/dto/create-comment.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: []
})
export class TaskComponent implements OnInit {

  checked: boolean = false;
  CommentForm: FormGroup;
  employees: [];
  loading = false;
  endOpen: boolean = false;
  public errMessage: string;
  comments: [];
  total;


  Tasks: [];
  name; description; startDate; endDate; status;

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private auth: AuthenticationService,
    private message: NzMessageService,
    private router: Router,
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
        this.endDate = res.task_expectedEndDate;
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

  updateProject() {

  }

  memberList = [
      {
          name: 'Erin Gonzales',
          avatar: 'assets/images/avatars/thumb-1.jpg'
      },
      {
          name: 'Darryl Day',
          avatar: 'assets/images/avatars/thumb-2.jpg'
      },
      {
          name: 'Marshall Nichols',
          avatar: 'assets/images/avatars/thumb-3.jpg'
      },
      {
          name: 'Virgil Gonzales',
          avatar: 'assets/images/avatars/thumb-4.jpg'
      },
      {
          name: 'Riley Newman',
          avatar: 'assets/images/avatars/thumb-6.jpg'
      },
      {
          name: 'Pamela Wanda',
          avatar: 'assets/images/avatars/thumb-7.jpg'
      }
  ]

  commentList = [
    {
        name: 'Lillian Stone',
        img: 'assets/images/avatars/avatar.png',
        date: '28th Jul 2018',
        review: 'The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.'
    },
    {
        name: 'Victor Terry',
        img: 'assets/images/avatars/thumb-9.jpg',
        date: '28th Jul 2018',
        review: 'The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.'
    },
    {
        name: 'Wilma Young',
        img: 'assets/images/avatars/thumb-10.jpg',
        date: '28th Jul 2018',
        review: 'The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.'
    }
]

  displayValidationErrors() {
    for (const i in this.CommentForm.controls) {
      this.CommentForm.controls[ i ].markAsDirty();
      this.CommentForm.controls[ i ].updateValueAndValidity();
    }
  }

   // date picker
   onStartChange(date: Date): void {
    this.CommentForm.patchValue({
      startDate: date,
     });
}

onEndChange(date: Date): void {
  this.CommentForm.patchValue({
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

}
