import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from 'src/app/shared/models/nav-item';
import { Router } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AccountService } from 'src/app/shared/services/account.service';
import { ROLES } from 'src/app/shared/constants/roles.constant';

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
export class MenuListComponent {
  expanded: boolean;
  @Input() item: NavItem;
  @Input() depth: number;
  @Input() role: ROLES;
  anonymous: string = ROLES.Anonymous;

  constructor(public navService: NavService,
              public router: Router,
              private accountService: AccountService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  get isAdmin() {
    return this.accountService.hasRole(ROLES.Admin);
  }

  get isAuthenticated(){
    return this.accountService.isAuthenticated();
  }
}
