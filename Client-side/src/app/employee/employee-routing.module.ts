import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
        title: 'Employee List'
    }
  },

  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    data: {
        title: 'Add Employee'
    }
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    data: {
        title: 'Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
