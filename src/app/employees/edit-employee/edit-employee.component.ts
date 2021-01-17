import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  employee: any;
  action: string;
  numRegex = /^-?\d*[.]?\d{0,2}$/;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee) {
    this.employee = { ...data };
    this.action = this.employee.action;
  }


  ngOnInit() {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      accountNumber: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(this.numRegex)]],
      sSecurityNumber: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid && this.action != "Delete") {
      return;
    }
    this.loading = true;

    this.dialogRef.close({event:this.action,data:this.employee});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
