import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.css']
})
export class CreateEditProductComponent implements OnInit {
  form: FormGroup;
  action: string;
  product: any;

  loading = false;
  submitted = false;
  returnUrl: string;
  pictureUrl: string;
  numRegex = /^-?\d*[.]?\d{0,2}$/;

  constructor(
    public dialogRef: MatDialogRef<CreateEditProductComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.product = {...data};
    this.action = this.product.action;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required, Validators.pattern(this.numRegex)],
      pictureUrl: ['', [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(){
    if (this.form.invalid && this.action != "Delete") {
      return;
    }
    this.product.unitPrice = this.f.unitPrice.value;
    this.dialogRef.close({event:this.action,data:this.product});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
