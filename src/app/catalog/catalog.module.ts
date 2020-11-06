import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateCatalogProductComponent } from './create-catalog-product/create-catalog-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShopAvailabilityComponent } from './product-detail/shop-availability/shop-availability.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';

@NgModule({
  declarations: [CreateCategoryComponent, CreateSubcategoryComponent, ProductCatalogComponent, CreateCatalogProductComponent, ProductDetailComponent, ShopAvailabilityComponent, CreateEditProductComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatDividerModule,
    MatGridListModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule
  ]
})
export class CatalogModule { }
