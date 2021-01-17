import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Shop } from '../models/shop.model';
import { Stock } from '../models/stock.model';
import { Warehouse } from '../models/warehouse.model';
import { HttpMethodsService } from './http-methods.service';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  constructor(private http: HttpMethodsService) {
  }

  loadWarehouses(){
    return this.http.get<Warehouse[]>('/inventory/warehouses');
  }

  createWarehouse(warehouse: Warehouse) {
    return this.http.post<Warehouse>('/inventory/warehouses', warehouse);
  }

  updateWarehouse(warehouse: Warehouse){
    return this.http.put('/inventory/warehouses', warehouse);
  }

  deleteWarehouse(id: number){
    return this.http.delete(`/inventory/warehouses/${id}`);
  }

  loadShops(){
    return this.http.get<Shop[]>('/inventory/shops');
  }

  createShop(shop: Shop){
    return this.http.post<Shop>('/inventory/shops', shop);
  }

  updateShop(shop: Shop){
    return this.http.put('/inventory/shops', shop);
  }

  deleteShop(id: number){
    return this.http.delete(`/inventory/shops/${id}`);
  }
/*
  loadShopStock(id: number){
    return this.http.get<Stock[]>(`/inventory/shop-stocks/${id}`);
  }

  loadWarehouseStock(id: number){
    return this.http.get<Stock[]>(`/inventory/warehouse-stocks/${id}`);
  }
  */

  loadWarehouse(id: number){
    return this.http.get<Warehouse>(`/inventory/warehouses/${id}`);
  }

  loadShop(id: number){
    return this.http.get<Shop>(`/inventory/shops/${id}`);
  }

  loadAllProducts(){
    return this.http.get<Product[]>("/inventory/products");
  }

  loadProductInventory(productId: number) {
    return this.http.get<Product>(`/inventory/products/${productId}/stocks`);
  }

  loadProductWithInventoryWithoutWarehouses(productId: number){
    return this.http.get<Product>(`/inventory/products/${productId}/stocks-without-warehouses`);
  }

  loadShopsWithoutProductStock(productId: number) {
    return this.http.get<Shop[]>(`/inventory/shops/without_product/${productId}`);
  }

  loadWarehousesWithoutProductStock(productId: number) {
    return this.http.get<Warehouse[]>(`/inventory/warehouses/without_product/${productId}`);
  }

  addProductsToShops(productId: number, shopIds: number[]) {
    return this.http.put<Shop[]>(`/inventory/shops/product-allocation/${productId}`, shopIds);
  }

  addProductsToWarehouses(productId: number, warehouseIds: number[]){
    return this.http.put<Product>(`/inventory/warehouses/product-allocation/${productId}`, warehouseIds);
  }
}
