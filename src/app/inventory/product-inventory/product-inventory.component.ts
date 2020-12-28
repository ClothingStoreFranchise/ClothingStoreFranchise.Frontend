import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { Product } from 'src/app/shared/models/product.model';
import { Stock } from 'src/app/shared/models/stock.model';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { WarehousesShopsAllocationComponent } from './warehouses-shops-allocation/warehouses-shops-allocation.component';


@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductInventoryComponent {

  panelOpenState = false;
  isTableExpanded = false;
  displayedColumns: string[] = ['id', 'address'];
  sizesDictionary = TSHIRT_JACKETS_PANTS;

  product: Product;
  totalWarehoseStock: Stock[] = [];
  shopsDataSource = new MatTableDataSource();
  warehousesDataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.product = { ...data };
    this.inventoryService.loadProductInventory(this.product.id)
      .subscribe(inventory => {
        this.shopsDataSource.data = inventory.shops;
        this.warehousesDataSource.data = inventory.warehouses;
        this.totalWarehoseStock = inventory.totalWarehouseStock;
      });
  }

  addShopsOrWarehouses(building: any) {
    var obj: any;

    if (building == "shops") {
      this.inventoryService.loadShopsWithoutProductStock(this.product.id)
        .subscribe(shops => {
          obj = shops;
          obj.building = building;

          this.openDialog(obj);
        });
    } else {
      this.inventoryService.loadWarehousesWithoutProductStock(this.product.id)
        .subscribe(warehouses => {
          obj = warehouses;
          obj.building = building;

          this.openDialog(obj);
        });
    }
  }

  checkSizeType(typeId: number): boolean {
    return typeId === ClothingSizeType.tshirtsJacketsPants;
  }

  private openDialog(obj) {
    const dialogRef = this.dialog.open(WarehousesShopsAllocationComponent, {
      width: 'auto',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event != "Cancel") {
        if (obj.building == "shops") {
          this.inventoryService.addProductsToShops(this.product.id, result.data)
            .subscribe(shops => {

              const data = this.shopsDataSource.data;
              data.push(...shops);
              this.shopsDataSource.data = data;
            })
        } else {
          this.inventoryService.addProductsToWarehouses(this.product.id, result.data)
            .subscribe(inventory => {
              const data = this.warehousesDataSource.data;
              data.push(...inventory.warehouses);
              this.warehousesDataSource.data = data;
              this.totalWarehoseStock = inventory.totalWarehouseStock;
            })
        }
      }
    });
  }

}
