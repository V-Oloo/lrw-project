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

  constructor(private projectService: ProjectService, private message: NzMessageService,) { }

  ngOnInit(): void {
    this.projectService.getProjectTbDetails().subscribe((res:any) => {
      this.projectList = res
    });
  }

  deactivateProject(id: number) {
    this.projectService.updateStatus(id, {status : "INACTIVE"}).subscribe((res) => {
      this.message.create('success', `Customer Deactivated`);
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  activateProject(id: number) {
    this.projectService.updateStatus(id, {status : "ACTIVE"}).subscribe((res) => {
      this.message.create('success', `Customer Activated`);
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }


}
