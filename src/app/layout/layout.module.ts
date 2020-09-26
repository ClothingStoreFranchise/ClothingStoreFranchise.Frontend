import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const accountRoutes: Routes = [
  //{path: 'prueba', component: PruebaComponent}
  {

        path: '',
        children: [
          //{ path: 'login', component: LoginComponent },
          //{path: 'prueba', component: PruebaComponent}
          //{ path: 'register', component: RegisterComponent }
      ]
  }

];

@NgModule({
  declarations: [ HeaderComponent, MenuListComponent ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MenuListComponent
  ]
})
export class LayoutModule { }
