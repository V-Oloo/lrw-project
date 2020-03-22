import { Role } from './../../models/roles.model';
import { Routes } from '@angular/router';
import { MainAuthGuard } from '../guard/main.guard';
import { RoleGuard } from '../guard/role.guard';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
        canActivate: [MainAuthGuard,RoleGuard],
        data: { role: [Role.SUPERVISOR]},
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    } ,
    {
      path: 'employees',
      // canActivate: [MainAuthGuard,RoleGuard],
      loadChildren: () => import('../../employee/employee.module').then(m => m.EmployeeModule)
    },
    {
      path: 'customers',
      canActivate: [MainAuthGuard,RoleGuard],
      data: { role: [Role.SUPERVISOR]},
      loadChildren: () => import('../../customer/customer.module').then(m => m.CustomerModule)
    },
    {
      path: 'projects',
      canActivate: [MainAuthGuard,RoleGuard],
      data: { role: [Role.SUPERVISOR]},
      loadChildren: () => import('../../project/project.module').then(m => m.ProjectModule)
    },

    {
      path: 'technician',
      canActivate: [MainAuthGuard,RoleGuard],
      data: { role: [Role.TECHNICIAN]},
      loadChildren: () => import('../../technician/technician.module').then(m => m.TechnicianModule)
    }

];
