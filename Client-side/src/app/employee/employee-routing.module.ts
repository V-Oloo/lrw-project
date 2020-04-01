import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ProfileComponent } from './profile/profile.component';
import { Role } from '../models/roles.model';
import { EmployeeListResolver } from './employee-list-resolver';
import { NotificationComponent } from './notification/notification.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    resolve: {usersList: EmployeeListResolver},
    data: {
        role: [Role.SUPERVISOR, Role.ADMIN],
        title: 'Employee List'
    }
  },

  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    data: {
         role: [Role.SUPERVISOR, Role.ADMIN],
        title: 'Add Employee'
    }
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    data: {
        role: [Role.SUPERVISOR, Role.ADMIN, Role.FLAGGER],
        title: 'Profile'
    }
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    data: {
        role: [Role.SUPERVISOR, Role.ADMIN, Role.FLAGGER],
        title: 'Notifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
