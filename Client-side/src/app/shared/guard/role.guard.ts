import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const role = next.data.role;

      const currentUser = this.auth.currentUserValue;
      const emp_role = currentUser.role;

      if (role[0] === emp_role || role[1] === emp_role) {
        return true;
      }

      // navigate to not found page
      this.router.navigate(['/unauthorised']);
      return false;

  }

}
