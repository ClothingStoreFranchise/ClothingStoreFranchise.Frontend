import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartProductBase } from '../models/cart-product-base.model';
import { CartProduct } from '../models/cart-product.model';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';
import { HttpMethodsService } from './http-methods.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class CustomersService {

  public cartSubject: BehaviorSubject<CartProduct[]>;
  public cartCounterSubject: BehaviorSubject<number>;

  constructor(
    private router: Router,
    private http: HttpMethodsService,
    private localStorage: LocalStorageService
  ) {
    this.cartSubject = new BehaviorSubject<CartProduct[]>([]);

    var numberCartProducts:number = this.localStorage.get('cartCounter');
    if(numberCartProducts == null){
      this.localStorage.set('cart', []);
      this.localStorage.set('cartCounter', 0);
      this.cartCounterSubject = new BehaviorSubject<number>(0);
    }else{
      this.cartCounterSubject = new BehaviorSubject<number>(numberCartProducts);
    }
  }

  public get cartValue(): CartProduct[] {
    return this.cartSubject.value;
  }

  public get cartCounterValue(): number {
    return this.cartCounterSubject.value;
  }

  cleanCart() {
    this.cartSubject.next([]);
    this.cartCounterSubject.next(0);
    this.localStorage.set('cart', []);
    this.localStorage.set('cartCounter', 0);
  }

  createCustomer(customer: Customer) {
    var cart : CartProductBase[] = this.localStorage.get('cart');

    customer.cartProducts = cart as CartProduct[];

    return this.http.post<Customer>(`/customers/customers/`, customer, { observe: 'response' })
      .subscribe( resp => {
        this.cartCounterSubject.next(0);
        this.localStorage.set('cart', []);
        this.localStorage.set('cartCounter', 0);
/*
          this.router.navigate(['/catalog/novelties'])
            .then(() => window.location.reload());*/
      });
  }

  getByUsername(username: string) {
    return this.http.get<Customer>(`/customers/customers/${username}`);
  }

  addProductsToCart(products: CartProductBase[]) {
    var user: User = this.localStorage.get('userData');
    if(user != null){
      this.http.put<CartProduct[]>(`/customers/cart/customer/${user.id}`, products)
        .pipe()
        .subscribe(cartLoaded => {
          var counter = this.countCartProducts(cartLoaded);
          this.cartCounterSubject.next(counter);
        });
    }
    else{
      var cartCounter = this.localStorage.get('cartCounter');
      var cart : CartProductBase[] = this.localStorage.get('cart');

      for(var product of products){

        cartCounter += product.quantity;

        var existingIndex = cart.findIndex(p => p.productId == product.productId && p.size == product.size);
        if(existingIndex != -1){
          cart[existingIndex].quantity += product.quantity;

        }else{
          cart.push(product as CartProductBase);
        }
      }
      this.cartCounterSubject.next(cartCounter);
      this.localStorage.set('cart', cart);
      this.localStorage.set('cartCounter', cartCounter);
    }
  }

  loadCart() {
    var user: User = this.localStorage.get('userData');
    if(user != null) {
      this.http.get<CartProduct[]>(`/customers/cart/customer/${user.id}`)
        .pipe()
        .subscribe(cartLoaded => {
          this.cartSubject.next(cartLoaded);
          var productsNumber = this.countCartProducts(cartLoaded);
          this.cartCounterSubject.next(productsNumber);
        });
    }
    else {
      var cart = this.localStorage.get('cart');
      if(cart != null){
        this.http.post<CartProduct[]>(`/customers/cart/`, cart)
          .pipe()
          .subscribe(cartLoaded => {
            this.cartSubject.next(cartLoaded);
            var productsNumber = this.countCartProducts(cartLoaded);
            this.cartCounterSubject.next(productsNumber);

            var productsNumber = this.countCartProducts(cartLoaded);
            this.localStorage.set('cart', cartLoaded as CartProductBase[]);
            this.localStorage.set('cartCounter', productsNumber);
          });
      }
    }
  }

  removeCustomerCart(customerId: number) {
    this.http.delete(`/customers/cart/customer/${customerId}`);
  }

  removeCartProduct(product: CartProduct) {
    var user: User = this.localStorage.get('userData');
    var cartCounter = this.cartCounterSubject.value;
    var cart = this.cartSubject.value;
    var cartUpdated = cart.filter(p => p.id != product.id);

    cartCounter -= product.quantity;
    this.cartSubject.next(cartUpdated);
    this.cartCounterSubject.next(cartCounter);

    if(user != null) {
      this.http.delete(`/customers/cart/${product.id}`);
    }else{
      this.localStorage.set('cart', cartUpdated);
      this.localStorage.set('cartCounter', cartCounter);
    }
  }

  updateCartProductQuantity(cartProduct: CartProduct) {
    var user: User = this.localStorage.get('userData');
    if(user != null) {
      this.http.put<CartProduct>(`/customers/cart`, cartProduct)
        .pipe()
        .subscribe(productUpdated => {
          var cart = this.cartSubject.value;
          var index = cart.findIndex(p => p.id == productUpdated.id);

          if(index != -1){
            cart[index].quantity = productUpdated.quantity;
            this.cartSubject.next(cart);
            var counter = this.countCartProducts(cart);
            this.cartCounterSubject.next(counter);
          }
        });
    }else{
      var cartCounter = this.countCartProducts(this.cartSubject.value);
      this.cartCounterSubject.next(cartCounter);
      this.localStorage.set('cartCounter', cartCounter);
    }
  }
  private countCartProducts(cart: CartProduct[]) {
    var total = 0;
    for(var productCart of cart) {
      total += productCart.quantity;
    }
    return total;
  }
}
