import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment.component';
import { CancelTaskComponent } from './cancel-task.component';


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
        title: 'Add Comment'
    }
  },
  {
    path: 'cancel/:id',
    component: CancelTaskComponent,
    data: {
        title: 'Cancel Task'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
