import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shop } from 'src/app/shared/models/shop.model';
import { Stock } from 'src/app/shared/models/stock.model';

@Component({
  selector: 'app-shop-availability',
  templateUrl: './shop-availability.component.html',
  styleUrls: ['./shop-availability.component.css']
})
export class ShopAvailabilityComponent {

  size: number;
  local_data: any;
  selectedStock: Stock[];
  available: boolean;

  constructor(
    public dialogRef: MatDialogRef<ShopAvailabilityComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public shops: Shop[]) {
    this.local_data = {...shops};
    this.size = this.local_data.size;
  }

  checkAvailable(stock: Stock[]) {
    this.available = stock.find(s => s.size == this.size).stock > 0;
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
