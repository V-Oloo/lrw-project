import { SignaturePadModule } from 'angular2-signaturepad';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { TechnicianRoutingModule } from './technician-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './comment.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CancelTaskComponent } from './cancel-task.component';
import { ConfirmTaskCompleteComponent } from './confirm-task-complete.component';


@NgModule({
  declarations: [DashboardComponent, CommentComponent, CancelTaskComponent, ConfirmTaskCompleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    TechnicianRoutingModule,
    ReactiveFormsModule,
    QuillModule,
    SignaturePadModule
  ],
  providers: [
    DatePipe
  ]
})
export class TechnicianModule { }
