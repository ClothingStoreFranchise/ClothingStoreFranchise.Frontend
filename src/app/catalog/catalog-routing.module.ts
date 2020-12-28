import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCatalogProductComponent } from './create-catalog-product/create-catalog-product.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const catalogRoutes: Routes = [
  {
    path: '',
    children: [
        { path: 'create-category', component: CreateCategoryComponent },
        { path: 'create-subcategory/:name/:id', component: CreateSubcategoryComponent },
        { path: 'novelties', component: ProductCatalogComponent },
        { path: ':parentname/:name/:id', component: ProductCatalogComponent },
        { path: ':parentname/:name/:id/create-product-catalog', component: CreateCatalogProductComponent },
        { path: ':parentname/:name/:id/product-detail/:product-id', component: ProductDetailComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(catalogRoutes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
