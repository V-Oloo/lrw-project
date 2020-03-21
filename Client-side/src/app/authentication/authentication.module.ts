import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './reset-password.component';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule
    ],
    declarations: [
        
    LoginComponent,
        
    ResetPasswordComponent,
        
    ChangePasswordComponent]
})

export class AuthenticationModule {}