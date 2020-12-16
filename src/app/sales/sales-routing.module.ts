import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';

const salesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'orders/customers/:id', component: CustomerOrdersComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})

export class SalesRoutingModule { }
