import { EventEmitter, Injectable, Output } from '@angular/core';
import { Category } from '../models/category.model';
import { NavItem } from '../models/nav-item';

import { HttpMethodsService } from './http-methods.service'
import { catchError, first, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {

  public categoriesSubject: BehaviorSubject<Category[]>;
  public categoriesObservable: Observable<Category[]>;
  public categories: Category[] = [];

  counter = 1;
  count: BehaviorSubject<number> = new BehaviorSubject(this.counter);

  constructor(
    private router: Router,
    private http: HttpMethodsService
  ){
    //this.count = new BehaviorSubject(this.counter);
    this.categoriesSubject = new BehaviorSubject<Category[]>(this.categories);
    this.categoriesObservable = this.categoriesSubject.asObservable();
  }

  public get categoriesValue(): Category[] {
    return this.categoriesSubject.value;
}

  loadCategories(){

    this.count = new BehaviorSubject(this.counter);
    this.http.get<Category[]>(`/catalog/category/`)
    .pipe(first())
    .subscribe(categories => {
      this.categories = categories;
      this.categoriesSubject.next(categories);
    });
  }

  createCategory(category: Category){
    this.http.post<Category[]>(`/catalog/category/`, category)
    .pipe(first())
    .subscribe(categoriesAct => {
      this.categories = categoriesAct;
      this.categoriesSubject.next(categoriesAct);
    });
  }

  loadNovelties() {
    return this.http.get<Product[]>(`/catalog/catalog_products/novelties`);
  }

  loadSubcategoryProducts(subcategoryId: number) {
    return this.http.get<Product[]>(`/catalog/category/subcategory/${subcategoryId}`);
  }

  addProductToSubcatedory(product: Product) {
    return this.http.post<Product>(`/catalog/catalog_products/`, product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`/catalog/catalog_products/`, product);
  }

  deleteProduct(productId: number) {
    this.http.delete(`/catalog/catalog_products/${productId}`);
  }
}
