import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { TechnicianRoutingModule } from './technician-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './comment.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CancelTaskComponent } from './cancel-task.component';


@NgModule({
  declarations: [DashboardComponent, CommentComponent, CancelTaskComponent],
  imports: [
    CommonModule,
    SharedModule,
    TechnicianRoutingModule,
    ReactiveFormsModule,
    QuillModule,
  ]
})
export class TechnicianModule { }
