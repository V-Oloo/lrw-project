import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment.component';
import { CancelTaskComponent } from './cancel-task.component';
import { ConfirmTaskCompleteComponent } from './confirm-task-complete.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
        title: 'Home'
    }
  },
  {
    path: 'comment/:id',
    component: CommentComponent,
    data: {
        title: 'Job Summary'
    }
  },
  {
    path: 'cancel/:id',
    component: CancelTaskComponent,
    data: {
        title: 'Cancel Task'
    }
  },

  {
    path: 'task-summary/:id',
    component: ConfirmTaskCompleteComponent,
    data: {
        title: 'Job Completion Form'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
