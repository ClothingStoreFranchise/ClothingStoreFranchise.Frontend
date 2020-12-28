import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { Employee } from 'src/app/shared/models/employee.model';
import { Warehouse } from 'src/app/shared/models/warehouse.model';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-warehouse-stock',
  templateUrl: './warehouse-stock.component.html',
  styleUrls: ['./warehouse-stock.component.css']
})
export class WarehouseStockComponent implements OnInit {

  displayedColumns: string[] = ['product_id', 'product_name', 'size', 'stock'];
  warehouseId: number;
  warehouse: Warehouse;
  sizesDictionary = TSHIRT_JACKETS_PANTS;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.warehouseId = this.route.snapshot.params['id'];

    if(this.warehouseId == undefined){
      var employee: Employee = this.localStorageService.get('employeeData');
      this.warehouseId = employee.warehouseId;
    }

    this.inventoryService.loadWarehouse(this.warehouseId)
      .subscribe(warehouse => {
        this.warehouse = warehouse;
      })
  }
}
