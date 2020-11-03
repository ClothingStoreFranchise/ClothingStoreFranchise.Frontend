import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { CreateWarehouseShopComponent } from './create-warehouse-shop/create-warehouse-shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopStockComponent } from './shop-stock/shop-stock.component';
import { WarehouseStockComponent } from './warehouse-stock/warehouse-stock.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ShopListComponent } from './shop-list/shop-list.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { WarehousesShopsAllocationComponent } from './product-inventory/warehouses-shops-allocation/warehouses-shops-allocation.component';

@NgModule({
  declarations: [
    CreateWarehouseShopComponent,
    ShopStockComponent,
    WarehouseStockComponent,
    ShopListComponent,
    WarehouseListComponent,
    ProductListComponent,
    ProductInventoryComponent,
    WarehousesShopsAllocationComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    SharedModule
  ]
})
export class InventoryModule { }
