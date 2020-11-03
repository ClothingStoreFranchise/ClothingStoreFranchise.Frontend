import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Warehouse } from 'src/app/shared/models/warehouse.model';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { CreateWarehouseShopComponent } from '../create-warehouse-shop/create-warehouse-shop.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'address', 'phone', 'action'];
  warehouses: Warehouse[] = [];

  @ViewChild(MatTable,{static:false}) table: MatTable<any>;

  constructor(public router: Router, public dialog: MatDialog, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.loadWarehouses()
    .subscribe(warehouses => {
      this.warehouses = warehouses;
    });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CreateWarehouseShopComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addWarehouse(result.data);
      }else if(result.event == 'Update'){
        this.updateWarehouse(result.data);
      }else if(result.event == 'Delete'){
        this.deleteWarehouse(result.data);
      }
    });
  }

  addWarehouse(row_obj){
    this.inventoryService.createWarehouse(row_obj)
      .subscribe(warehouse => {
        this.warehouses.push(warehouse);
        this.table.renderRows();
      });
  }

  updateWarehouse(row_obj){
    this.warehouses = this.warehouses.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.address = row_obj.address;
        value.phone = row_obj.phone;

        this.inventoryService.updateWarehouse(row_obj)
          .subscribe(warehouse => {
            console.log("succesfully updated");
          });
      }
      return true;
    });
  }

  deleteWarehouse(row_obj){
    this.inventoryService.deleteWarehouse(row_obj.id);

    this.warehouses = this.warehouses.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
