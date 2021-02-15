import { formatDate } from '@angular/common';
import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user.model';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  form: FormGroup;
  cartProducts: CartProduct[];
  customer: Customer;
  date: string;
  expiration = new FormControl('', [
    Validators.required
  ]);

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private localStorage: LocalStorageService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CartProduct[]) {
      this.cartProducts = data;
      var user: User = this.localStorage.get('userData');
      this.customersService.getByUsername(user.username)
        .subscribe( customer => {
          this.customer = customer;

          if(customer.expirationDate == null){
            this.date = formatDate(Date.now(), 'yyyy-MM', 'en-US');
          }else{
            this.date = formatDate(customer.expirationDate, 'yyyy-MM', 'en-US');
          }
        });
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      address: ['', Validators.required],
      card: ['', Validators.required]
      //salary: ['', [Validators.required, Validators.pattern(this.numRegex)]],
      //sSecurityNumber: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(){

    if (this.form.invalid) {
      return;
    }

    var order: Order = {
      customerId: this.customer.id,
      address: this.customer.address,
      card: this.customer.cardNumber,
      orderProducts: this.cartProducts.map(
        cartProduct => ({
          productId: cartProduct.productId,
          name: cartProduct.name,
          pictureUrl: cartProduct.pictureUrl,
          unitPrice: cartProduct.unitPrice,
          clothingSizeType: cartProduct.clothingSizeType,
          size: cartProduct.size,
          quantity: cartProduct.quantity
        })
      )
    }

    this.dialogRef.close({event:'Checkout',data: order, customer:this.customer});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  getSubtotal(cartProduct: CartProduct): number {
    return cartProduct.unitPrice * cartProduct.quantity;
  }

  getTotalPrice(): number {
    var total = 0
    for(let product of this.cartProducts){

      total += this.getSubtotal(product);
    }

    return total;
  }
}
