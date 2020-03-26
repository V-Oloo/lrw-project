import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateCustomerComponent } from '../customer/update-customer/update-customer.component';
import { UpdateProjectComponent } from './update-project/update-project.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
        title: 'Projects List'
    }
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
    data: {
        title: 'Add Project'
    }
  },
  {
    path: 'update-project/:id',
    component: UpdateProjectComponent,
    data: {
        title: 'Update Project'
    }
  },

  {
    path: 'update-task/:id',
    component: UpdateTaskComponent,
    data: {
        title: 'Update Task'
    }
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    data: {
        title: 'Project Details'
    }
  },
  {
    path: 'task/:id',
    component: TaskComponent,
    data: {
        title: 'Task Details'
    }
  },
  {
    path: 'completed/tasks',
    component: CompletedTasksComponent,
    data: {
        title: 'Complete Task'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
