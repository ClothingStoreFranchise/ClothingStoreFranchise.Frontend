import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from './shared/constants/roles.constant';
import { DefaultRouteGuard } from './shared/guards/default-route.guard';
import { RoleGuard } from './shared/guards/role.guard';

const salesModule = () => import('./sales/sales.module').then(x => x.SalesModule);
const inventoryModule = () => import('./inventory/inventory.module').then(x => x.InventoryModule);
const catalogModule = () => import('./catalog/catalog.module').then(x => x.CatalogModule);
const employeesModule = () => import('./employees/employees.module').then(x => x.EmployeesModule);
const customersModule = () => import('./customers/customers.module').then(x => x.CustomersModule);
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const appRoutes: Routes = [

  {path: 'inventory', loadChildren: inventoryModule,
    canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}, ${ROLES.WarehouseEmployee}, ${ROLES.ShopEmployee}]`}},
  {path: 'catalog', loadChildren: catalogModule,
    canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}, ${ROLES.Customer}, ${ROLES.Anonymous}]`}},
  {path: 'account', loadChildren: accountModule},
  {path: 'customers', loadChildren: customersModule,
    canActivate: [RoleGuard], data: {roles: `[${ROLES.Customer}, ${ROLES.Anonymous}]`}},
  {path: 'employees', loadChildren: employeesModule,
    canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}]`}},
  {path: 'sales', loadChildren: salesModule,
    canActivate: [RoleGuard], data: {roles: `[${ROLES.Admin}, ${ROLES.Customer}, ${ROLES.WarehouseEmployee}]`}},
  {path: '', canActivate: [DefaultRouteGuard], redirectTo: '', pathMatch: 'full'},
  {path: '**', canActivate: [DefaultRouteGuard], redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
