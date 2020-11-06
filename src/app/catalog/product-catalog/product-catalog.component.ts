import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { CreateEditProductComponent } from '../create-edit-product/create-edit-product.component';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  catalogProducts: Product[];
  subcategoryId: number;
  subcategoryName: string;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private catalogService: CatalogService
  ) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.subcategoryId = this.route.snapshot.params['id'];

    this.catalogService.loadSubcategoryProducts(this.subcategoryId)
      .subscribe(catalogProducts => {
        this.catalogProducts = catalogProducts;
      });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CreateEditProductComponent, {
      width: '100%',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Create'){
        this.createProduct(result.data);
      }else if(result.event == 'Update'){
        this.updateProduct(result.data);
      }else if(result.event == 'Delete'){
        this.deleteProduct(result.data);
      }
    });
  }

  createProduct(product: Product) {
    product.subcategoryId = this.subcategoryId;
    this.catalogService.addProductToSubcatedory(product)
      .pipe(first())
      .subscribe(productCreated => {
        this.catalogProducts.push(productCreated);
      })
  }

  updateProduct(product: Product) {
    this.catalogService.updateProduct(product)
      .pipe(first())
      .subscribe(productUpdateded => {
        let itemIndex = this.catalogProducts.findIndex(p => p.id == productUpdateded.id);
        this.catalogProducts[itemIndex] = productUpdateded;
      })
  }

  deleteProduct(product: Product) {
    this.catalogService.deleteProduct(product.id);

    this.catalogProducts = this.catalogProducts.filter((value,key)=>{
      return value.id != product.id;
    });
  }


  imageClick(productId: number) {
    this.router.navigate([`${this.router.url}/product-detail/${productId}`]);
  }
}
