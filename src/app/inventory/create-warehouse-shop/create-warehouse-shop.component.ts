import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Warehouse } from 'src/app/shared/models/warehouse.model';

@Component({
  selector: 'app-create-warehouse-shop',
  templateUrl: './create-warehouse-shop.component.html',
  styleUrls: ['./create-warehouse-shop.component.css']
})
export class CreateWarehouseShopComponent implements OnInit {
  action: string;
  local_data: any;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateWarehouseShopComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Warehouse) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.form.invalid && this.action != "Delete") {
      return;
    }

    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
