import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothingSizeType } from 'src/app/shared/constants/clothing-sizes.constant';
import { Category } from 'src/app/shared/models/category.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css']
})
export class CreateSubcategoryComponent implements OnInit {
  parentId: number;
  name: string;
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  selectedSizeType: number;

  clothingSizeType = [
    { viewValue: 'Camisetas, Chaquetas y Pantalones', value: ClothingSizeType.tshirtsJacketsPants},
    { viewValue: 'Calzado', value: ClothingSizeType.footwear}
  ];

  selectedTypeSize: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private catalogService: CatalogService,
  ) {  }

  ngOnInit() {
    this.parentId = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];

    this.form = this.formBuilder.group({
      subcategoryname: ['', Validators.required]
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

    var subcategory = new Category(this.f.subcategoryname.value, undefined, this.parentId, this.selectedSizeType);
    this.catalogService.createCategory(subcategory);
    //this.appService.nextCount();
    /*.pipe(first())
    .subscribe(resp => {
      this.router.navigate([this.returnUrl]);
      console.log("Return URL: "+this.returnUrl);
    },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );*/
    /*this.accountService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(resp => {
        // Here, resp is of type HttpResponse<MyJsonData>.
        // You can inspect its headers:

        this.router.navigate([this.returnUrl])
        // And access the body directly, which is typed as MyJsonData as requested.
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  */
  }
}
