import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from 'src/app/shared/constants/roles.constant';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { CommonErrorStateMatcher } from 'src/app/shared/helpers/common-error-state-matcher';
import { Customer } from 'src/app/shared/models/customer.model';
import { first } from 'rxjs/operators';
import { EditEmployeeComponent } from 'src/app/employees/edit-employee/edit-employee.component';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import { CustomersService } from 'src/app/shared/services/customers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  matcher = new CommonErrorStateMatcher();
  loading = false;
  submitted = false;

  role: ROLES;
  buildingId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountService,
    private customersService: CustomersService,
    private employeesService: EmployeesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    this.buildingId = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: this.checkPasswords
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    var user : User = {
      username: this.f.username.value,
      password: this.f.password.value,
      role: this.role
    }

    switch(this.role){
      case ROLES.Customer:{
        this.createCustomerDialog(user);
        break;
      }
      case ROLES.WarehouseEmployee:
      case ROLES.ShopEmployee:
        this.createEmployeeDialog(user);
        break;
      default:
        console.log('invalid role');

    }
    /*
    this.accountService.registerAccount(user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
        */
  }

  createEmployeeDialog(user){
    user.action = 'Add';
      const dialogRef =this.dialog.open(EditEmployeeComponent, {
        width: 'auto',
        data: user
      });

      dialogRef.afterClosed().subscribe(result => {
        this.registerEmployee(result.data);
      });
  }

  registerEmployee(employee: Employee) {
    this.accountService.registerUser(employee)
      .pipe(first())
      .subscribe(resp => {
        employee.id = resp.body.id;
        if(this.role == ROLES.ShopEmployee){
          employee.shopId = this.buildingId;
          this.employeesService.createShopEmployee(employee)
            .subscribe();
        }else{
          employee.warehouseId = this.buildingId;
          this.employeesService.createWarehouseEmployee(employee)
          .subscribe();
        }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

        this.router.navigate(["../../"], {relativeTo: this.route});
  }

  createCustomerDialog(user) {

      const dialogRef =this.dialog.open(CreateAccountComponent, {
        width: 'auto',
        data: user
      });

      dialogRef.afterClosed().subscribe(result => {
        this.registerCustomer(result.data);
      });
  }

  registerCustomer(customer: Customer){
    this.accountService.registerUser(customer)
      .pipe(first())
      .subscribe(resp => {
        customer.id = resp.body.id;
        this.customersService.createCustomer(customer);

          this.router.navigate(["/account/login"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

    /*
      .subscribe(
        data => {

          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
        */
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
