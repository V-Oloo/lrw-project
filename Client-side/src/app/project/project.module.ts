import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';



@NgModule({
  declarations: [ProjectsComponent, AddProjectComponent, ProjectDetailsComponent, UpdateProjectComponent, TaskComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QuillModule
  ]
})
export class ProjectModule { }
