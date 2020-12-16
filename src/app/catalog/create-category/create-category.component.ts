import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  count: number;

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private catalogService: CatalogService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categoryname: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  addCategory(){

  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    var category = new Category(this.f.categoryname.value);
    this.catalogService.createCategory(category);
    this.router.navigate(["/"]);
  }
}
