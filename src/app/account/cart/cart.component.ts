import { Component, OnInit } from '@angular/core';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'size', 'action'];
  sizesDictionary = TSHIRT_JACKETS_PANTS;
  cartProducts: CartProduct[];

  constructor(
    private accountService: AccountService
    ) { }

  ngOnInit(): void {

    this.accountService.loadCart();
    this.accountService.cartSubject
      .subscribe(cartProducts => {
        this.cartProducts = cartProducts;
      });
  }

  updateQuantity(cartProduct: CartProduct) {
    this.accountService.updateCartProductQuantity(cartProduct);
  }

  delete(cartProduct: CartProduct){
    this.accountService.removeCartProduct(cartProduct);
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
