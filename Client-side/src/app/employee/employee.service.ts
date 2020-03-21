import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';
import { shareReplay, map } from 'rxjs/operators';
import { Registration } from '../models/registration.model';
import { ChangePassword } from '../models/change-password.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private global: Globals) { }

  getEmployees() {
    return this.http.get(`${this.global._BaseUri}/employees`)
               .pipe(map((data: any) => data.data), shareReplay(), );
   }

   getAssignableEmployees() {
     return this.http.get(`${this.global._BaseUri}/employees/technicians/assignable`)
                .pipe(map((data: any) => data.data), shareReplay(), );
   }

   addEmployee(data: Registration) {
     return this.http.post(`${this.global._BaseUri}/employees/addEmployee`, data);
   }

   getEmployee(id: number) {
      return this.http.get(`${this.global._BaseUri}/employees/${id}`)
                 .pipe(map((data: any) => data), shareReplay(), );
   }

   changePassword(data: ChangePassword, empId: number) {
     return this.http.patch(`${this.global._BaseUri}/employees/${empId}/changePassword`, data );
   }

   updateEmpDetails(data: Registration, empId: number) {
      return this.http.patch(`${this.global._BaseUri}/employees/${empId}/update`, data);
   }

   updateEmpStatus(id: number, status: any) {
    return this.http.patch(`${this.global._BaseUri}/employees/${id}/status`, status);
   }

   dashboardStats() {
    return this.http.get(`${this.global._BaseUri}/project/dashboard/stats`,)
                    .pipe(map((data: any) => data), shareReplay(), );
   }

   uploadPic(formData) {
     return this.http.post(`${this.global._BaseUri}/employees/4/avatar'`, formData);
   }

}
