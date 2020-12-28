import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { OrderProductsComponent } from './order-products/order-products.component';

const salesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'orders/customers/:id', component: CustomerOrdersComponent},
      { path: 'orders/:state', component: OrderProductsComponent},
      { path: 'warehouse/orders', component: OrderProductsComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})

export class SalesRoutingModule { }
