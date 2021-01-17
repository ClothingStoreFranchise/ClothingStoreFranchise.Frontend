import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from 'src/app/shared/constants/roles.constant';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'salary', 'add', 'delete'];
  employees: Employee[] = [];
  building: any;
  buildingId: number;
  isShop: boolean;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.buildingId = this.route.snapshot.params['id'];
    this.isShop = this.router.url.includes("shops");

    if(!this.isShop){
      this.employeesService.loadWarehouseById(this.buildingId)
        .subscribe( warehouse => {
          this.loading = false;
            this.building = warehouse;
            this.employees = warehouse.warehouseEmployees;
          });
      } else {
        this.employeesService.loadShopById(this.buildingId)
        .subscribe( shop => {
          this.loading = false;
            this.building = shop;
            this.employees = shop.shopEmployees;
          });
      }
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '500px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateEmployee(result.data);
      }else if(result.event == 'Delete'){
        this.deleteEmployee(result.data);
      }
    });
  }

  updateEmployee(employee: Employee) {
    if(!this.isShop){
      this.employeesService.updateWarehouseEmployee(employee)
        .subscribe(employee => {
          this.updateEmployeeArray(employee);
        })
      }else {
        this.employeesService.updateShopEmployee(employee)
        .subscribe(employee => {
          this.updateEmployeeArray(employee);
        })
      }
  }

  registerEmployee(){
    if(this.isShop){
      this.router.navigate([`${this.router.url}/register/`+ROLES.ShopEmployee]);
    }
    else{
      this.router.navigate([`${this.router.url}/register/`+ROLES.WarehouseEmployee]);
    }
  }

  deleteEmployee(employee: Employee) {
    if(!this.isShop){
      this.employeesService.deleteWarehouseEmployee(employee.id);
    }else{
      this.employeesService.deleteShopEmployee(employee.id);
    }

    this.employees = this.employees.filter((value,key)=>{
      return value.id != employee.id;
    });
  }

  private updateEmployeeArray(employee: Employee){
    let updateItem = this.employees.find(e => e.id = employee.id);
    let index = this.employees.indexOf(updateItem);
    this.employees[index] = employee;
  }
}
