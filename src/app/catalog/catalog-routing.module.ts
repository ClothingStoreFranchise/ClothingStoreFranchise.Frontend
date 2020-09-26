import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';

const catalogRoutes: Routes = [
  {
    path: '',
    children: [
        { path: 'create-category', component: CreateCategoryComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(catalogRoutes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
