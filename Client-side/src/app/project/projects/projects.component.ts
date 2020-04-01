import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {

  projectList: [];
  search : any;

  constructor(private projectService: ProjectService, private message: NzMessageService, private auth: AuthenticationService) { }

  currentUser = this.auth.currentUserValue;
  userId = this.currentUser.user_id

  ngOnInit(): void {
    this.projectService.getProjectTbDetails().subscribe((res:any) => {
      this.projectList = res
      console.log(this.userId)
    });
  }

  deactivateProject(id: number) {
    this.projectService.updateStatus(id, {status : "INACTIVE"}).subscribe((res) => {
      this.message.create('success', `Project Deactivated`);
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  activateProject(id: number) {
    this.projectService.updateStatus(id, {status : "ACTIVE"}).subscribe((res) => {
      this.message.create('success', `Project Activated`);
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  completeProject(id: number) {
    this.projectService.updateStatus(id, {status : "COMPLETED"}).subscribe((res) => {
      this.message.create('success', `Project Completed`);
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }


}
