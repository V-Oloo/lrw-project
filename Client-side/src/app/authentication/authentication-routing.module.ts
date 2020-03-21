import { ChangePasswordComponent } from './change-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [

  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
    data: {
        title: 'Login'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
        title: 'Reset Password'
    }
  },
  {
    path: 'create-password',
    component: ChangePasswordComponent,
    data: {
        title: 'Create Password'
    }
  }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
