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
    return this.http.get(this.global._BaseUri + '/employees')
               .pipe(map((data: any) => data.data), shareReplay(), );
   }

   addEmployee(data: Registration) {
     return this.http.post(this.global._BaseUri + '/employees/addEmployee', data);
   }

   getEmployee(id: number) {
      return this.http.get(this.global._BaseUri + `/employees/${id}`)
                 .pipe(map((data: any) => data), shareReplay(), );
   }

   changePassword(data: ChangePassword, empId: number) {
     return this.http.patch(this.global._BaseUri + `/employees/${empId}/changePassword`, data );
   }

   updateEmpDetails(data: Registration, empId: number) {
      return this.http.patch(this.global._BaseUri + `/employees/${empId}/update`, data);
   }

}
