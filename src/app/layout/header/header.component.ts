import { Component, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../shared/models/nav-item';
import { NavService } from '../../shared/services/nav.service';
import { CatalogService } from '../../shared/services/catalog.service';
import { Category } from '../../shared/models/category.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { ROLES } from 'src/app/shared/constants/roles.constant';

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

  categoriesNavItem: NavItem[] = [];

  hidden = false;

  constructor(
    media: MediaMatcher,
    public navService: NavService,
    private router: Router,
    private catalogService: CatalogService,
    private accountService: AccountService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  ngOnInit(): void {

    this.catalogService.loadCategories();
    if(this.accountService.userSubject.value.role == ROLES.Customer){
      this.accountService.loadCart();
    }

    this.categoriesNavItem.push(new NavItem("Añadir Categoría", "create-category"));
    this.catalogService.categoriesSubject
      .pipe()
      .subscribe(categories => {
        this.converToNavItem(categories);
      });

    this.accountService.cartCounterSubject
      .pipe()
      .subscribe(counter => {
        this.cartCounter = counter;
      })

      this.accountService.userSubject
      .pipe()
      .subscribe(user => {
       this.user = user;
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

  navItems: NavItem[] = [
    {
      displayName: 'Catálogo',
      iconName: 'recent_actors',
      route: 'catalog/',
      parentId: null
    },
    {
      displayName: 'Inventario',
      iconName: 'videocam',
      route: 'inventory',
      children: [
        {
          displayName: 'Existencias de Productos',
          iconName: 'group',
          route: 'inventory/products/'
        },
        {
          displayName: 'Almacenes',
          iconName: 'group',
          route: 'inventory/warehouses'
        },
        {
          displayName: 'Tiendas',
          iconName: 'speaker_notes',
          route: 'inventory/shops'
        }
      ]
    },
    {
      displayName: 'Ventas',
      iconName: 'videocam',
      route: 'orlando',

    },
    {
      displayName: 'Empleados',
      iconName: 'videocam',
      route: 'employees/',
      children: [
        {
          displayName: 'Almacenes',
          iconName: 'group',
          route: 'employees/warehouses',
        },
        {
          displayName: 'Tiendas',
          iconName: 'speaker_notes',
          route: 'employees/shops',
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'maleficent/feedback'
        }
      ]
    },
  ];
}
