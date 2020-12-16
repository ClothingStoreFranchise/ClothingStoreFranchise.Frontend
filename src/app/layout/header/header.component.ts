import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../shared/models/nav-item';
import { NavService } from '../../shared/services/nav.service';
import { CatalogService } from '../../shared/services/catalog.service';
import { Category } from '../../shared/models/category.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { ROLES } from 'src/app/shared/constants/roles.constant';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { OrderState } from 'src/app/shared/constants/order-state.const';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('snav') snav: ElementRef;

  mobileQuery: MediaQueryList;

  showSubmenu: boolean = false;
  showSubSubMenu: boolean = false;
  isExpanded = true;
  isShowing = false;

  count: number;
  cartCounter: number;
  user: User;
  userRole: string;

  categoriesNavItem: NavItem[] = [];

  hidden = false;

  constructor(
    media: MediaMatcher,
    public navService: NavService,
    private router: Router,
    private localStorage: LocalStorageService,
    private catalogService: CatalogService,
    private accountService: AccountService,
    private customersService: CustomersService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  ngOnInit(): void {

    this.categoriesNavItem.push(new NavItem("Añadir Categoría", "create-category"));
    this.catalogService.loadCategories();
    this.catalogService.categoriesSubject
      .pipe()
      .subscribe(categories => {
        this.converToNavItem(categories);
      });

      this.accountService.userSubject
      .pipe()
      .subscribe(user => {
        this.user = user;
        this.userRole = user.role;
      });

    if(this.userRole == ROLES.Customer){
        this.customersService.loadCart();
    }

    this.customersService.cartCounterSubject
      .pipe()
      .subscribe(counter => {
        this.cartCounter = counter;
      });
  }

  ngAfterViewInit() {
    this.navService.snav = this.snav;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    this.accountService.logout();
    console.log("hola!");
    this.router.navigate(['/account/login']);
  }

  converToNavItem(categories: Category[]) {
    this.categoriesNavItem = [];

    for(var category of categories){
      var subcategories = [];
      if(category.subcategories.length>0){
        for(var sub of category.subcategories){
          var subcategory = new NavItem(sub.name, category.name, sub.id, category.id, null);
          subcategories.push(subcategory);
        }
      }
      var item = new NavItem(category.name, null, category.id, null, subcategories);
      this.categoriesNavItem.push(item);
    }

    for(var item of this.navItems){
      if(item.displayName == "Catálogo"){
        item.children = this.categoriesNavItem;
        break;
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

  get isEmployee() {
    return this.accountService.hasRole(ROLES.WarehouseEmployee) || this.accountService.hasRole(ROLES.ShopEmployee)
  }

  navItems: NavItem[] = [
    {
      displayName: 'Catálogo',
      route: 'catalog/',
      visibility: [ROLES.Admin, ROLES.Customer, 'anonymous']
    },
    {
      displayName: 'Inventario',
      route: 'inventory',
      visibility: [ROLES.Admin],
      children: [
        {
          displayName: 'Existencias de Productos',
          visibility: [ROLES.Admin],
          route: 'inventory/products/'
        },
        {
          displayName: 'Almacenes',
          visibility: [ROLES.Admin],
          route: 'inventory/warehouses'
        },
        {
          displayName: 'Tiendas',
          visibility: [ROLES.Admin],
          route: 'inventory/shops'
        }
      ]
    },
    {
      displayName: 'Ventas',
      route: 'sales/',
      visibility: [ROLES.Admin],
      children: [
        {
          displayName: 'Pedidos',
          visibility: [ROLES.Admin],
          route: 'sales/orders/',
          children: [
            {
              displayName: 'Pedidos Pendientes',
              visibility: [ROLES.Admin],
              route: 'sales/orders/'+OrderState.PENDING
            },
            {
              displayName: 'Pedidos Confirmados',
              visibility: [ROLES.Admin],
              route: 'sales/orders/'+OrderState.CONFIRMED
            },
            {
              displayName: 'Pedidos Preparados',
              visibility: [ROLES.Admin],
              route: 'sales/orders/'+OrderState.PREPARED
            },
            {
              displayName: 'Pedidos Cancelados',
              visibility: [ROLES.Admin],
              route: 'sales/orders/'+OrderState.CANCELLED
            }
          ]
        }
      ]
    },
    {
      displayName: 'Empleados',
      iconName: 'videocam',
      route: 'employees/',
      visibility: [ROLES.Admin],
      children: [
        {
          displayName: 'Almacenes',
          iconName: 'group',
          visibility: [ROLES.Admin],
          route: 'employees/warehouses',
        },
        {
          displayName: 'Tiendas',
          visibility: [ROLES.Admin],
          route: 'employees/shops',
        }
      ]
    },
  ];
}
