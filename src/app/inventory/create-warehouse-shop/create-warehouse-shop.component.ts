import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Warehouse } from 'src/app/shared/models/warehouse.model';

@Component({
  selector: 'app-create-warehouse-shop',
  templateUrl: './create-warehouse-shop.component.html',
  styleUrls: ['./create-warehouse-shop.component.css']
})
export class CreateWarehouseShopComponent {
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<CreateWarehouseShopComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: Warehouse) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
