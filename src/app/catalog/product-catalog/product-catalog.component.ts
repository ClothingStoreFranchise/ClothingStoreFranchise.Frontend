import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';

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


  imageClick(productId: number) {
    this.router.navigate([`${this.router.url}/product-detail/${productId}`]);
  }

}
