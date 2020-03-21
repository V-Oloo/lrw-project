import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
import { Login } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public isAuthenticated(): boolean {
      return !!localStorage.getItem('currentUser');
    }

    login(authCredentials: Login) {
        return this.http.post<any>(`${API_URL}/employees/login`, authCredentials)
        .pipe(map(user => {
            if (user && user.data.result.access_token) {
                localStorage.setItem('currentUser', JSON.stringify(user.data.result));
                this.currentUserSubject.next(user.data.result);
            }
            return user;
        }));
    }

    getJwtToken() {
      const currentUser = this.currentUserValue;
      const token = currentUser.access_token;

      return token;
    }

    isTokenExpired(): boolean {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(this.getJwtToken());
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    resetPassword(email: string) {
      return this.http.get<any>(`${API_URL}/users/genpasswordreset/${email}`);
    }

    resendEmail(email: string) {
      return this.http.get<any>(`${API_URL}/employees/resendconfirmationemail/${email}`);
    }

    passwordReset(user: { newPassword: any; token: any; userId: any; }) {
      return this.http.post<any>(`${API_URL}/employees/password_reset` , user);
    }
}
