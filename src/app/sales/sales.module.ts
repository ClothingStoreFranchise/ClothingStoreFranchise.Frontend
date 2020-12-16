import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { SalesRoutingModule } from './sales-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [CustomerOrdersComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatGridListModule,
  ]
})
export class SalesModule { }
