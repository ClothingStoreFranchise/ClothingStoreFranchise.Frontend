import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { Shop } from 'src/app/shared/models/shop.model';
import { Router } from '@angular/router';
import { CreateWarehouseShopComponent } from '../create-warehouse-shop/create-warehouse-shop.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'address', 'phone', 'action'];
  shops: Shop[] = [];

  @ViewChild(MatTable,{static:false}) table: MatTable<any>;

  constructor(public router: Router, public dialog: MatDialog, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.loadShops()
    .subscribe(shops => {
      this.shops = shops;
    });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CreateWarehouseShopComponent, {
      width: 'auto',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addShop(result.data);
      }else if(result.event == 'Update'){
        this.updateShop(result.data);
      }else if(result.event == 'Delete'){
        this.deleteShop(result.data);
      }
    });
  }

  addShop(row_obj){
    this.inventoryService.createShop(row_obj)
      .subscribe(shop => {
        this.shops.push(shop);
        this.table.renderRows();
      });
  }

  updateShop(row_obj){
    this.shops = this.shops.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.address = row_obj.address;
        value.phone = row_obj.phone;

        this.inventoryService.updateShop(row_obj)
          .subscribe(shop => {
            console.log("succesfully updated");
          });
      }
      return true;
    });
  }

  deleteShop(row_obj){
    this.inventoryService.deleteShop(row_obj.id);

    this.shops = this.shops.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
