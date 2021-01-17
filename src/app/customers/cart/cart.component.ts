import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { SalesService } from 'src/app/shared/services/sales.service';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'size', 'action'];
  sizesDictionary = TSHIRT_JACKETS_PANTS;
  cartProducts: CartProduct[];
  user: User;

  constructor(
    private accountService: AccountService,
    private customersService: CustomersService,
    private salesService: SalesService,
    public checkoutDialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.customersService.loadCart();
    this.customersService.cartSubject
      .subscribe(cartProducts => {
        this.cartProducts = cartProducts;
      });
  }

  updateQuantity(cartProduct: CartProduct) {
    this.customersService.updateCartProductQuantity(cartProduct);
  }

  updateStock(stock: number): number[] {
    return Array(stock).fill(0).map((x,i)=>i+1);
  }

  delete(cartProduct: CartProduct){
    this.customersService.removeCartProduct(cartProduct);
  }

  checkout(){
    if(!this.accountService.userValue){
      this.router.navigate(["/account/register/CUSTOMER"]);
    }else {
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.checkoutDialog.open(CheckoutDialogComponent, {
      width: 'auto',
      data: this.cartProducts
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Checkout'){
        this.salesService.createOrder(result.data)
          .subscribe( t => {
            this.customersService.removeCustomerCart(result.data.customerId);
            this.customersService.cleanCart();
          }
        );
      }
    });
  }

  checkSizeType(typeId: number): boolean {
    return typeId === ClothingSizeType.tshirtsJacketsPants;
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
