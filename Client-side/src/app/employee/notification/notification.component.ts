import { Status } from './../../models/task-status.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: []
})
export class NotificationComponent implements OnInit {

  constructor(private emp: EmployeeService, private auth: AuthenticationService) { }

  notifications: [];
  checkbox = false;


  currentUser = this.auth.currentUserValue;
  userId = this.currentUser.user_id;

  ngOnInit(): void {
     this.emp.getNotifications(this.userId).subscribe(res => {
       this.notifications = res.data.data;
     });
  }

  markAsRead(id: number) {
       this.emp.updateNotificationStatus(id, {status : "READ"}).subscribe(res => {
         window.location.reload()
       });
  }

  markAsUnread(id: number) {

     this.emp.updateNotificationStatus(id, {status: "UNREAD"}).subscribe(res => {
      window.location.reload()
     });
}

}
