import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ROLES } from 'src/app/shared/constants/roles.constant';
import { Product } from 'src/app/shared/models/product.model';
import { AccountService } from 'src/app/shared/services/account.service';
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
  category: string;
  isNovelty: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private accountService: AccountService,
    private catalogService: CatalogService
  ) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.subcategoryId = this.route.snapshot.params['id'];
    this.category = decodeURIComponent(this.route.snapshot.params['parentname']);
    this.subcategoryName = decodeURIComponent(this.route.snapshot.params['name']);

    if(this.subcategoryId == null){
      this.isNovelty = true;
      this.catalogService.loadNovelties()
      .subscribe(catalogProducts => {
        this.catalogProducts = catalogProducts;

      });
    }else{
      this.catalogService.loadSubcategoryProducts(this.subcategoryId)
      .subscribe(catalogProducts => {
        this.catalogProducts = catalogProducts;
      });
    }
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CreateEditProductComponent, {
      width: '100%',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
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
    this.catalogService.addProductToSubcategory(product)
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

  imageClick(product: Product) {
    if(this.isCustomer||!this.isAuthenticated) {
      if(this.isNovelty){
        this.router.navigate([`/catalog/${product.categoryName}/${product.subcategoryName}/${product.subcategoryId}/product-detail/${product.id}`]);
      }else{
        this.router.navigate([`${this.router.url}/product-detail/${product.id}`]);
      }
    }
  }

  get isAuthenticated(){
    return this.accountService.isAuthenticated();
  }

  get isAdmin() {
    return this.accountService.hasRole(ROLES.Admin);
  }

  get isCustomer() {
    return this.accountService.hasRole(ROLES.Customer);
  }
}
