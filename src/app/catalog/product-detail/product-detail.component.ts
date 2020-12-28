import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { CartProductLocalStorage } from 'src/app/shared/models/cart-product-local-storage.model';
import { Product } from 'src/app/shared/models/product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { ShopAvailabilityComponent } from './shop-availability/shop-availability.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  form: FormGroup;
  category: string;
  subcategory: string;
  subcategoryId: number;
  productId: number;
  sizesDictionary = TSHIRT_JACKETS_PANTS;
  sizeType = ClothingSizeType;
  available: boolean;
  selectedSize: number;
  selectedQuantity = 1;

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    private customersService: CustomersService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['product-id'];
    this.subcategoryId = this.route.snapshot.params['id'];
    this.category = decodeURIComponent(this.route.snapshot.params['parentname']);
    this.subcategory = decodeURIComponent(this.route.snapshot.params['name']);

    this.inventoryService.loadProductWithInventoryWithoutWarehouses(this.productId)
      .subscribe(product => {
        this.product = product;
        this.available = this.checkAvailableOnline(product);
      });
  }

  addProductToCart(product: Product) {

    var cartProduct : CartProductLocalStorage[] = [{
      productId: product.id,
      quantity: this.selectedQuantity,
      size: this.selectedSize
    }]

    this.customersService.addProductsToCart(cartProduct);
    this.alertService.success("Producto añadido al carro");

    //this.alertService.error("Product added to cart");
  }

  showShopsAvailability(size, shops) {
    shops.size = size;
    this.dialog.open(ShopAvailabilityComponent, {
      width: '100%',
      data: shops
    });
  }

  checkSizeTotalWarehouseStock(size: number) : boolean {

    return this.product.totalWarehouseStock.find(s => s.size == size).stock == 0;
  }

  private checkAvailableOnline(product: Product): boolean {
    var available = false;
    for(let stock of product.totalWarehouseStock){
      if(stock.stock>0){
        available = true;
        break;
      }
    }
    return available;
  }

  clickCategory(){
    this.router.navigate([`/catalog/`,this.category,this.subcategory, this.subcategoryId]);
  }
}
