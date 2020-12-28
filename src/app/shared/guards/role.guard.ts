import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLES } from '../constants/roles.constant';
import { User } from '../models/user.model';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private _localStorage: LocalStorageService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var user: User = this._localStorage.get('userData');

      var roles: ROLES[] = route.data.roles;
      if(user != null && roles.includes(user.role) || roles.includes(ROLES.Anonymous)){
        return true;
      }

      this._router.navigate(['/']);
      return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.canActivate(route, state);
  }
}
