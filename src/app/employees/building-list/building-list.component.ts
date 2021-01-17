import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from 'src/app/shared/models/warehouse.model';
import { EmployeesService } from 'src/app/shared/services/employees.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'address', 'phone', 'employeesNumber'];
  buildings: any[] = [];
  isShop: boolean;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.isShop = this.router.url.includes("shops");

    if(!this.isShop){
      this.employeesService.loadWarehouses()
      .subscribe( warehouses => {
          this.loading = false;
          this.buildings = warehouses;
        });
    }else{
      this.employeesService.loadShops()
      .subscribe( shops => {
          this.loading = false;
          this.buildings = shops;
      });
    }
  }

  seeEmployees(id: number){
    this.router.navigate([`${this.router.url}/${id}`]);
  }
}
