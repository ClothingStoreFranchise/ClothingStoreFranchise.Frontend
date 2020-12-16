import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Shop } from '../models/shop.model';
import { Warehouse } from '../models/warehouse.model';
import { HttpMethodsService } from './http-methods.service';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  constructor(
    private http: HttpMethodsService
  ){}

  loadWarehouses(){
    return this.http.get<Warehouse[]>("/employees/warehouses");
  }

  loadWarehouseById(id: number){
    return this.http.get<Warehouse>(`/employees/warehouses/${id}`);
  }

  loadShops() {
    return this.http.get<Shop[]>("/employees/shops");
  }

  loadShopById(id: number) {
    return this.http.get<Shop>(`/employees/shops/${id}`);
  }

  createShopEmployee(employee: Employee) {
    return this.http.post<Employee>("/employees/shop-employees", employee);
  }

  createWarehouseEmployee(employee: Employee) {
    console.log("creando employee")
    return this.http.post<Employee>("/employees/warehouse-employees", employee);
  }

  updateShopEmployee(employee: Employee) {
    return this.http.put<Employee>("/employees/shop-employees", employee);
  }

  updateWarehouseEmployee(employee: Employee) {
    return this.http.put<Employee>("/employees/warehouse-employees", employee);
  }

  deleteWarehouseEmployee(id: number) {
    return this.http.delete(`/employees/warehouse-employees/${id}`);
  }

  deleteShopEmployee(id: number) {
    return this.http.delete(`/employees/shop-employees/${id}`);
  }
}
