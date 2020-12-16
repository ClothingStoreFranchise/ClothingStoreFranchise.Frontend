import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpMethodsService } from './http-methods.service';

@Injectable({ providedIn: 'root' })
export class SalesService {
  constructor(
    private http: HttpMethodsService
  ){}

  createOrder(order: Order){
    return this.http.post<Order>("/sales/orders", order);
  }

  loadOrdersByCustomerId(customerId: number) {
    return this.http.get<Order[]>(`/sales/orders/customers/${customerId}`);
  }
}
