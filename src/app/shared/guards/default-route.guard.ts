import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ROLES } from "../constants/roles.constant";
import { User } from "../models/user.model";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteGuard implements CanActivate{
  constructor(private _localStorage: LocalStorageService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var user: User = this._localStorage.get('userData');

      if(user.role === ROLES.Customer || user == null){
        this._router.navigate(['/catalog/novelties']);
      }else if(user.role === ROLES.Admin){
        this._router.navigate(['/inventory/products']);
      }else if(user.role === ROLES.ShopEmployee || user.role === ROLES.WarehouseEmployee){
        this._router.navigate(['/inventory/warehouse/products']);
      }else{
        return true;
      }

      //this._router.navigate(['/inventory/products']);
  }

}
