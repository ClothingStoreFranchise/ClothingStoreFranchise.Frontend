import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { HttpMethodsService } from './http-methods.service'
import { User } from '../models/user.model'
import { catchError, first, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpMethodsService,
    private localStorage: LocalStorageService
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.get('userData')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {

    return this.http.post('/auth/login', { username, password }, { observe: 'response' })
      .pipe(
        map(resp => {

          this.localStorage.set('jwt', resp.headers.get('Authorization'));
          this.setAccount(username);
          return resp
        }),
        catchError((err: HttpErrorResponse) => {
          return err.status == 401
            ? throwError("Wrong username or password") : throwError("Server error: " + err.status);    //Rethrow it back to component
        })
      );
  }

  private setAccount(username: string) {
    this.http.get<User>(`/auth/identifieduser/${username}`)
      .pipe(first())
      .subscribe(user => {
        this.localStorage.set('userData', user);
        /*if(user.role == "ADMIN")
          this.setAccountCustomer(username);*/
      } );
  }

  private setAccountCustomer(username: string) {
    this.http.get<Customer>(`/customers/customers/william/${username}`)
      .pipe(first())
      .subscribe(user => {
        this.localStorage.set('userData', user);
      }
      );
  }

  registerCustomer(customer: Customer) {
    //return this.http.post(`/users/register`, user);
  }

  getById(id: string) {
    return this.http.get(`/auth/identifieduser/${id}`)
  }
}
