import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from '../shared/constants/roles.constant';
import { RoleGuard } from '../shared/guards/role.guard';
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
      { path: 'products', component: ProductListComponent,
          canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
      { path: 'products/:id', component: ProductInventoryComponent,
          canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
      { path: 'warehouses', component: WarehouseListComponent,
          canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
      { path: 'shops', component: ShopListComponent,
          canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
      { path: 'shops/:id', component: ShopStockComponent,
          canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
      { path: 'warehouses/:id', component: WarehouseStockComponent,
          canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
      { path: 'warehouse/products', component: WarehouseStockComponent},
      { path: 'shop/products', component: ShopStockComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(inventoryRoutes)],
  exports: [RouterModule]
})

export class InventoryRoutingModule { }
