import { Component, ChangeDetectorRef, OnDestroy, OnInit, HostBinding, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from 'src/app/shared/models/nav-item';
import { Router } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListComponent implements OnInit {
  expanded: boolean;
  //@HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: NavService,
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    /*this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        //this.ariaExpanded = this.expanded;
         console.log(`${this.item.route} is expanded: ${this.expanded}`);
         console.log(this.item)
      }
    });*/
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }


}
