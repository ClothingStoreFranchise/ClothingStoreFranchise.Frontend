import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopStockComponent } from './shop-stock/shop-stock.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseStockComponent } from './warehouse-stock/warehouse-stock.component';

const inventoryRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'products', component: ProductListComponent},
      { path: 'products/:id', component: ProductInventoryComponent},
      { path: 'warehouses', component: WarehouseListComponent},
      { path: 'shops', component: ShopListComponent},
      { path: 'shops/:id', component: ShopStockComponent},
      { path: 'warehouses/:id', component: WarehouseStockComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(inventoryRoutes)],
  exports: [RouterModule]
})

export class InventoryRoutingModule { }