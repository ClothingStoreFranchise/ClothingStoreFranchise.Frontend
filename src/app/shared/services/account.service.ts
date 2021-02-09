import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StatusCodes } from 'http-status-codes';
import { HttpMethodsService } from './http-methods.service'
import { User } from '../models/user.model'
import { catchError, first, map, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { ROLES } from '../constants/roles.constant';
import { CustomersService } from './customers.service';
import { EmployeesService } from './employees.service';
import { CartProductBase } from '../models/cart-product-base.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpMethodsService,
    private customersService: CustomersService,
    private employeesService: EmployeesService,
    private localStorage: LocalStorageService
  ) {
    this.userSubject = new BehaviorSubject<User>(localStorage.get('userData'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  getUser() {
    return this.userSubject.value;
  }

  isAuthenticated() {
    var user: User = this.userValue;
    return !!user;
  }

  hasRole(role: ROLES) {
    return this.isAuthenticated() && this.userValue.role == role;
  }

  logout() {
    this.userSubject.next(null);
    this.localStorage.remove('jwt');
    this.localStorage.remove('userData');
    this.localStorage.remove('employeeData');
    this.localStorage.set('cart', []);
    this.localStorage.set('cartCounter', 0);
    //this.router.navigate(['/account/login']);
    //window.location.reload();
    this.router.navigate(['/account/login'])
      .then(() => window.location.reload());
  }

  login(username: string, password: string) {
    return this.http.post<Response>('/auth/login', { username, password }, { observe: 'response' })
      .pipe(
        map(resp => {
          this.localStorage.set('jwt', resp.headers.get('Authorization'));
          this.getAccount(username);
          return resp
        }),
        catchError((err: HttpErrorResponse) => {
          return err.status == StatusCodes.UNAUTHORIZED
            ? throwError("Usuario o contraseña incorrectos") : throwError("Server error: " + err.status);    //Rethrow it back to component
        })
      );
  }

  private getAccount(username: string) {

    this.http.get<User>(`/auth/user/${username}`)
      .pipe(first())
      .subscribe(user => {
        this.userSubject.next(user);
        this.localStorage.set('userData', user);

        if(user.role == ROLES.Customer){

          var cart : CartProductBase[] = this.localStorage.get('cart');
          if(cart.length>0){

            this.customersService.addProductsToCart(cart);
            /*this.localStorage.set('cart', []);
            this.localStorage.set('cartCounter', 0);*/
          }

          this.router.navigate(['/catalog/novelties'])
            .then(() => window.location.reload());

        }else if(user.role == ROLES.WarehouseEmployee){
          this.employeesService.loadWarehouseEmployee(user.id)
            .subscribe(employee => {
              this.localStorage.set('employeeData', employee);

              this.router.navigate(['/inventory/warehouse/products'])
                .then(() => window.location.reload());
            });
        }else if(user.role == ROLES.ShopEmployee){
          this.employeesService.loadShopEmployee(user.id)
            .subscribe(employee => {
              this.localStorage.set('employeeData', employee);

              this.router.navigate(['/inventory/shop/products'])
                .then(() => window.location.reload());
            });
        }else if(user.role == ROLES.Admin){
          this.router.navigate(['/inventory/products'])
            .then(() => window.location.reload());
        }
      } );
  }

  registerUser(user: User) {
    return this.http.post(`/auth/user/`, user, { observe: 'response' })
      .pipe(
        map((resp: HttpResponse<any>) => {
          return resp;
        }),
        catchError((err: HttpErrorResponse) => {
          return err.status == StatusCodes.CONFLICT
            ? throwError("Ya esxiste este nombre de ususario") : throwError("Server error: " + err.status);    //Rethrow it back to component
        })
      );
  }

  getById(id: string) {
    return this.http.get(`/auth/user/${id}`);
  }

  deleteUser(id: number){
    this.http.delete(`/auth/user/${id}`);
  }
}
