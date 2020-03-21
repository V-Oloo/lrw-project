import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class MainAuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}


    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['authentication/login']);
      }
      return this.auth.isAuthenticated();

    }

  }

