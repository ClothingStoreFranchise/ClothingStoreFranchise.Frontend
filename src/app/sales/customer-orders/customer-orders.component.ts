import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { OrderState, ORDER_STATE_DICTIONARY } from 'src/app/shared/constants/order-state.const';
import { OrderProduct } from 'src/app/shared/models/order-product.model';
import { Order } from 'src/app/shared/models/order.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  orders: Order[];
  displayedColumns: string[] = ['id', 'date', 'address', 'total'];
  dictionary = ORDER_STATE_DICTIONARY;
  sizesDictionary = TSHIRT_JACKETS_PANTS;

  constructor(
    private salesService: SalesService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.salesService.loadOrdersByCustomerId(this.accountService.userValue.id)
      .subscribe( orders => {
        this.orders = orders;
      });
  }

  checkSizeType(typeId: number): boolean {
    return typeId === ClothingSizeType.tshirtsJacketsPants;
  }

  getSubtotal(orderProduct: OrderProduct): number {
    return orderProduct.unitPrice * orderProduct.quantity;
  }

  getTotalPrice(orderProducts: OrderProduct[]): number {
    var total = 0
    for(let product of orderProducts){

      total += this.getSubtotal(product);
    }
    return total;
  }
}
