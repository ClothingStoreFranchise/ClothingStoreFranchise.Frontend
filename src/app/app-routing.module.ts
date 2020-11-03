import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const inventoryModule = () => import('./inventory/inventory.module').then(x => x.InventoryModule);
const catalogModule = () => import('./catalog/catalog.module').then(x => x.CatalogModule);
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const appRoutes: Routes = [
  //{path: 'otro', component: OtroComponent},
  //{path: 'otro', loadChildren: catalogModule},
  {path: 'inventory', loadChildren: inventoryModule},
  {path: 'catalog', loadChildren: catalogModule},
  {path: 'account', loadChildren: accountModule},
  {path: '', redirectTo: '/', pathMatch: 'full'}
  //{path: 'otro', component: OtroComponent}
  //{ path: '', loadChildren: accountModule }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
