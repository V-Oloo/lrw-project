import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { UpdateTaskComponent } from './update-task/update-task.component';



@NgModule({
  declarations: [ProjectsComponent, AddProjectComponent, ProjectDetailsComponent, UpdateProjectComponent, TaskComponent, CompletedTasksComponent, UpdateTaskComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QuillModule
  ],
  providers: [DatePipe]
})
export class ProjectModule { }
