import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthenticationService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.auth.isAuthenticated()) {
          const currentUser = this.auth.currentUserValue;
          const role = currentUser.role;

          if (currentUser) {
            if (role === 'SUPERVISOR') {
              this.router.navigateByUrl('/dashboard');
            }
            if (role === 'TECHNICIAN') {
              this.router.navigateByUrl('/technician');
            }
          }
        }
        return !this.auth.isAuthenticated();
    }
}
