import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getCompany(id: number) {
    return this.http.get(`${environment.apiUrl}/company/${id}`)
               .pipe(map((data: any) => data.data), shareReplay());
  }
}
