import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonErrorStateMatcher } from 'src/app/shared/helpers/common-error-state-matcher';
import { Customer } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  customer: Customer;

  matcher = new CommonErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<CreateAccountComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer) {
    this.customer = { ...data };
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.customer = {
      username: this.customer.username,
      password: this.customer.password,
      role: this.customer.role,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      address: this.f.address.value,
      country: this.f.country.value,
      phoneNumber: this.f.phoneNumber.value,
      email: this.f.email.value
    };

    this.dialogRef.close({ data: this.customer });
  }
}
