import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-create-catalog-product',
  templateUrl: './create-catalog-product.component.html',
  styleUrls: ['./create-catalog-product.component.css']
})
export class CreateCatalogProductComponent implements OnInit {
  subcategoryId: number;
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  pictureUrl;

  category: string;
  subcategory: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private catalogService: CatalogService,
    private _location: Location
  ) {  }

  ngOnInit() {
    this.subcategoryId = this.route.snapshot.params['id'];
    this.category = decodeURIComponent(this.route.snapshot.params['parentname']);
    this.subcategory = decodeURIComponent(this.route.snapshot.params['name']);

    this.form = this.formBuilder.group({
      productname: ['', Validators.required],
      pictureUrl: ['', Validators.required],
      unit_price: ['', [Validators.required, CreateCatalogProductComponent.decimalValidation]]

    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    var product = new Product(
      this.f.productname.value,
      +this.f.unit_price.value,
      this.pictureUrl,
      this.subcategoryId
    );

    this.catalogService.addProductToSubcategory(product)
    .pipe(first())
    .subscribe(p => {
      this._location.back();
    });
  }

  static decimalValidation(control: AbstractControl) {
    if (control.value.match(/^\d*\.?\d{0,2}$/g)) {
        return null;
    } else {
        return { 'twoDecimalAllowed': true };
    }
}
}
