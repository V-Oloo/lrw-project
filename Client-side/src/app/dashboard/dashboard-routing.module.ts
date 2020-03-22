import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MainAuthGuard } from '../shared/guard/main.guard';
import { DashboardResolver } from './dashboard-resolver';

const routes: Routes = [
    {
      path: '',
      canActivate: [MainAuthGuard],
      resolve: {stats: DashboardResolver},
      component: HomeComponent,
      data: {
          title: 'Home'
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
