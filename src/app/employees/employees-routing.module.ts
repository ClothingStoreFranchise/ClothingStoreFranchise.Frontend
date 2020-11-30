import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../account/register/register.component';
import { BuildingListComponent } from './building-list/building-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const employeeRoutes: Routes = [
  {
    path: '',
    children: [
        { path: 'warehouses', component: BuildingListComponent},
        { path: 'shops', component: BuildingListComponent},
        { path: 'warehouses/:id', component: EmployeeListComponent},
        { path: 'shops/:id', component: EmployeeListComponent},
        { path: 'shops/:id/register/:role', component: RegisterComponent},
        { path: 'warehouses/:id/register/:role', component: RegisterComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
