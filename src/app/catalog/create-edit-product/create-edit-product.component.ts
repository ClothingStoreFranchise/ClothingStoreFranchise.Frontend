import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.css']
})
export class CreateEditProductComponent {
  form: FormGroup;
  action: string;
  product: any;

  loading = false;
  submitted = false;
  returnUrl: string;
  pictureUrl: string;

  constructor(
    public dialogRef: MatDialogRef<CreateEditProductComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.product = {...data};
    this.action = this.product.action;
  }

  get f() { return this.form.controls; }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.product});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
