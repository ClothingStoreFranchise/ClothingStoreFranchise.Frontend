import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';

const customerRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'cart', component: CartComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(customerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomersRoutingModule { }

