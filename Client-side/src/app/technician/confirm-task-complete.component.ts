import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirm-task-complete',
  templateUrl: './confirm-task-complete.component.html',
  styles: []
})
export class ConfirmTaskCompleteComponent implements OnInit {

  loading = false;
  public errMessage: string;
  task;
  constructor(
    private _route: ActivatedRoute,
    private projectService: ProjectService,
    private auth: AuthenticationService,
    private message: NzMessageService,
    private _router: Router,
    private datePipe: DatePipe
  ) { }

  id = +this._route.snapshot.paramMap.get('id');
  name; description; workStart; workEnd; street; state; city; zipCode; org; email;

  ngOnInit(): void {
    this.projectService.getTaskById(this.id).subscribe(res => {
       this.task = res;
       this.name = this.task.name;
       this.description = this.task.description;
       this.workStart = this.task.workStart;
       this.workEnd = this.task.workEnd;
       this.street = this.task.street;
       this.state = this.task.state;
       this.city = this.task.city;
       this.zipCode = this.task.zipCode;
       this.org = this.task.org;
       this.email = this.task.email;
    });
  }


  sendMail() {
    var time = ((new Date(this.workEnd).getHours()) - (new Date(this.workStart).getHours()))

     this.loading = true;
     let address = this.street + ',' + this.city + ',' + this.state + ',' + this.zipCode;
     let start = this.datePipe.transform(this.workStart,'short');
     let end = this.datePipe.transform(this.workEnd,'short');
     const data = {email: this.email, address: address, org: this.org, start: start, end: end, name: this.name, time: time }
     this.projectService.sendClientEmail(data, this.id).subscribe(res => {
      this.loading = false;
      this.message.create('success', `Confirmation successfull`);
      this._router.navigate(['/technician'])
     }, error => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
     });
  }

}
