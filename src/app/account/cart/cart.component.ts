import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'size', 'action'];
  sizesDictionary = TSHIRT_JACKETS_PANTS;
  cartProducts: CartProduct[];
  selectedQuantity: number;

  constructor(
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    this.accountService.cartSubject
      .pipe()
      .subscribe(cartProducts => {
        this.cartProducts = cartProducts;
      });
  }

  openDialog(action,obj) {
    obj.action = action;
    /*const dialogRef = this.dialog.open(CreateWarehouseShopComponent, {
      width: '250px',
      data:obj
    });
    */
   /*
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addWarehouse(result.data);
      }else if(result.event == 'Update'){
        this.updateWarehouse(result.data);
      }else if(result.event == 'Delete'){
        this.deleteWarehouse(result.data);
      }
    });*/
  }

  delete(product: CartProduct){

  }

  checkSizeType(typeId: number): boolean {
    return typeId === ClothingSizeType.tshirtsJacketsPants;
  }

  getSubtotal(cartProduct: CartProduct): number {
    return cartProduct.unitPrice * cartProduct.quantity;
  }

  getTotal(): number {
    var total = 0
    for(let product of this.cartProducts){

      total += this.getSubtotal(product);
    }

    return total;
  }
}
