import { Injectable } from '@angular/core';
import { OrderState } from '../constants/order-state.const';
import { OrderProduct } from '../models/order-product.model';
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

  loadOrderProductsByState(state: OrderState) {
    return this.http.get<OrderProduct[]>(`/sales/order-products/state/${state}`);
  }

  loadOrderProductsByWarehouseId(warehouseId: number) {
    return this.http.get<OrderProduct[]>(`/sales/order-products/warehouses/${warehouseId}`);
  }

  updateOrderProduct(orderProduct: OrderProduct) {
    return this.http.put<OrderProduct>(`/sales/order-products`, orderProduct);
  }
}
