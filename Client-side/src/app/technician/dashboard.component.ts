import { Status } from './../models/task-status.model';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import * as _ from 'lodash'
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  position = 'top';
  size = 'small';

  constructor(
    private empService: EmployeeService,
    private auth: AuthenticationService,
    private projectService: ProjectService) { }

  currentUser = this.auth.currentUserValue;
  userId = this.currentUser.user_id;
  fname; role;
  tasks: [];
  openTasks: [];
  completed: [];
  inprogress: [];
  totalTasks;
  data: Status

  ngOnInit(): void {

    this.empService.getEmployee(this.userId).subscribe((res: any) => {
      console.log(this.userId);
      const employee = res.data;
      this.fname = employee.firstname;
      this.role = employee.jobTitle;

    });

    this.projectService.getEmployeeTasks(this.userId).subscribe((res:any) => {
       this.tasks = res;
       this.totalTasks = this.tasks.length;
       this.openTasks =  _.filter(this.tasks, {task_status: 'OPEN'});
       this.inprogress =  _.filter(this.tasks, {task_status: 'IN_PROGRESS'});
       this.completed = _.filter(this.tasks, {task_status: 'COMPLETE'});

    });

  }

  startTask(taskId: number) {
    this.projectService.startTask(taskId, {status: "IN_PROGRESS"}).subscribe((res:any) => {
      console.log('task started');
    }, (err: any) => {
      console.log(err);
    });
  }

}