import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(status?: string) {
    if(status) {
      let params = new HttpParams();
      params = params.append('status', status);

      return this.http.get(`${environment.apiUrl}/customer`, {params: params})
               .pipe(map((data: any) => data.data), shareReplay(), );

    }
    return this.http.get(`${environment.apiUrl}/customer`)
               .pipe(map((data: any) => data.data), shareReplay(), );
   }

   addCustomer(data: Customer) {
     return this.http.post(`${environment.apiUrl}/customer/addCustomer`, data);
   }

   getCustomer(id: number) {
      return this.http.get(`${environment.apiUrl}/customer/${id}`)
                 .pipe(map((data: any) => data), shareReplay(), );
   }

   updateCustomer(data: Customer, id: number) {
     return this.http.put(`${environment.apiUrl}/customer/${id}/update`, data);
   }

   updateStatus(id: number, status: any) {
    return this.http.patch(`${environment.apiUrl}/customer/${id}/status`, status);
   }

}
