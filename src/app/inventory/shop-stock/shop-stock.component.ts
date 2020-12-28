import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { Employee } from 'src/app/shared/models/employee.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { Stock } from 'src/app/shared/models/stock.model';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-shop-stock',
  templateUrl: './shop-stock.component.html',
  styleUrls: ['./shop-stock.component.css']
})
export class ShopStockComponent implements OnInit {

  displayedColumns: string[] = ['product_id', 'product_name', 'size', 'stock'];
  shopId: number;
  shop: Shop;
  sizesDictionary = TSHIRT_JACKETS_PANTS;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.params['id'];

    if(this.shopId == null){
      var employee: Employee = this.localStorageService.get('employeeData');
      this.shopId = employee.warehouseId;
    }

    this.inventoryService.loadShop(this.shopId)
    .subscribe(shop => {
      this.shop = shop;
     })
  }

  checkSizeType(typeId: number): boolean{
    return typeId === ClothingSizeType.tshirtsJacketsPants;
  }
}
