import { AuthenticationService } from './../shared/services/authentication.service';
import { Employee } from './../../../../server/src/models/employee.entity';
import { Observable, observable, forkJoin } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { ProjectService } from '../project/project.service';



@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {

  constructor(
    private empService: EmployeeService,
    private auth: AuthenticationService,
    private projectService: ProjectService,) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const currentUser = this.auth.currentUserValue;
    const userId = currentUser.user_id;

      const emp = this.empService.getEmployee(userId);

     const dashStat = this.empService.dashboardStats();

     const proDetails = this.projectService.getProjectTbDetails();

     const empList = this.empService.getEmployees();

     const pieChartData = this.projectService.getStatusStat();


    return forkJoin([emp, dashStat, proDetails, empList, pieChartData]);



  }
}
