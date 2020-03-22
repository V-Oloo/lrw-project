import { EmployeeService } from './employee.service';
import { Employee } from './../../../../server/src/models/employee.entity';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolver implements Resolve<Employee[]> {

  constructor(private empService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    return this.empService.getEmployees();
  }
}
