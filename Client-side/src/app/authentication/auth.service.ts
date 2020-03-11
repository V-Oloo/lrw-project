import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';
import { Login } from '../models/login.model';
import { map, shareReplay } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private global: Globals)  {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }



  loginUser(authCredentials: Login) {
    return this.http.post<any>(this.global._BaseUri + '/employees/login', authCredentials)
           .pipe(map(user => {
              if (user && user.data.result.access_token) {
                localStorage.setItem('currentUser',JSON.stringify(user.data.result));
                this.currentUserSubject.next(user.data.result);
              }
              return user;
            }),
             shareReplay(),
            );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
