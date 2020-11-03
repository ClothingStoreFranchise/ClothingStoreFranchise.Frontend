import { Component, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../shared/models/nav-item';
import { NavService } from '../../shared/services/nav.service';
import { CatalogService } from '../../shared/services/catalog.service';
import { Category } from '../../shared/models/category.model';
import { AccountService } from 'src/app/shared/services/account.service';

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

  categoriesNavItem: NavItem[] = [];

  hidden = false;

  constructor(
    media: MediaMatcher,
    public navService: NavService,
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
      displayName: 'Pedidos',
      iconName: 'videocam',
      route: 'orlando',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'orlando/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'orlando/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'orlando/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'orlando/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'orlando/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'orlando/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'orlando/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'orlando/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'orlando/feedback'
        }
      ]
    },
    {
      displayName: 'Empleados',
      iconName: 'videocam',
      route: 'maleficent',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'maleficent/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'maleficent/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'maleficent/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'maleficent/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'maleficent/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'maleficent/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'maleficent/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'maleficent/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'maleficent/sessions/become-angular-tailor'
            }
          ]
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
