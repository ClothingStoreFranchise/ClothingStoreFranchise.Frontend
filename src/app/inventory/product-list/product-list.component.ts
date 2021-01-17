import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductInventoryComponent } from '../product-inventory/product-inventory.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['image', 'id', 'name', 'unit_price'];
  products: Product[] = [];
  loading: boolean = true;

  @ViewChild(MatTable,{static:false}) table: MatTable<any>;

  constructor(public router: Router, public dialog: MatDialog, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.loadAllProducts()
    .subscribe(products => {
      this.loading = false;
      this.products = products;
    });
  }

  openDialog(product) {
    const dialogRef = this.dialog.open(ProductInventoryComponent, {
      width: '90%',
      height: '90%',
      data: product
    });
  }

}
