import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { HttpMethodsService } from './http-methods.service'
import { User } from '../models/user.model'
import { catchError, first, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Customer } from '../models/customer.model';
import { CartProduct } from '../models/cart-product.model';

interface CartProductLocalStorage {
  id: number,
  selectedQuantity: number,
  selectedSize: number
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public cartSubject: BehaviorSubject<CartProduct[]>;
  public cartCounterSubject: BehaviorSubject<number>;
  private cart: CartProduct[] = [];

  constructor(
    private router: Router,
    private http: HttpMethodsService,
    private localStorage: LocalStorageService
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.get('userData')));
    this.user = this.userSubject.asObservable();

    this.cartSubject = new BehaviorSubject<CartProduct[]>(localStorage.get('cart'));

    var numberCartProducts:number = this.localStorage.get('cartCounter');
    if(numberCartProducts == null){
      this.localStorage.set('cart', []);
      this.localStorage.set('cartCounter', 0);
      this.cartCounterSubject = new BehaviorSubject<number>(0);
    }else{
      this.cartCounterSubject = new BehaviorSubject<number>(numberCartProducts);
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get cartValue(): CartProduct[] {
    return this.cartSubject.value;
  }

  public get cartCounterValue(): number {
    return this.cartCounterSubject.value;
  }

  login(username: string, password: string) {

    return this.http.post<Response>('/auth/login', { username, password }, { observe: 'response' })
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
    this.http.get<Customer>(`/customers/customers/${username}`)
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

  addProductToCart(product: CartProduct) {
    if(this.userValue != null){
      //var productAdded = this.http.post<CartProduct>(`/customers/cart/`, product);
    }else{
      console.log("Adios");
    }

    //console.log("cart "+this.localStorage.get('cart'));
    //console.log("cart "+this.localStorage.get('jwt'));
    /*console.log("holabccccc "+ this.localStorage.get('cartCounter'));*/
    /*this.cart = this.localStorage.get('cart');
    this.cart.push(product);

    this.localStorage.set('cart', this.cart);
    var cartCounter = this.localStorage.get('cartCounter');
    cartCounter += product.quantity;

    this.localStorage.set('cartCounter', cartCounter);
    this.cartCounterSubject.next(cartCounter);*/
  }
}
