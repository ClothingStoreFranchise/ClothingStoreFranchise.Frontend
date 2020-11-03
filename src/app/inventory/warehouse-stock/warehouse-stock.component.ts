import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { Stock } from 'src/app/shared/models/stock.model';
import { InventoryService } from 'src/app/shared/services/inventory.service';

@Component({
  selector: 'app-warehouse-stock',
  templateUrl: './warehouse-stock.component.html',
  styleUrls: ['./warehouse-stock.component.css']
})
export class WarehouseStockComponent implements OnInit {

  displayedColumns: string[] = ['product_id', 'product_name', 'size', 'stock'];
  shopId: number;
  stocks: Stock[] = [];
  sizesDictionary = TSHIRT_JACKETS_PANTS;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.params['id'];

    this.inventoryService.loadWarehouseStock(this.shopId)
    .subscribe(stocks => {
      this.stocks = stocks;
     })
  }
}
