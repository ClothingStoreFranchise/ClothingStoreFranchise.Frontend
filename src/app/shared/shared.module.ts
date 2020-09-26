import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatBadgeModule} from '@angular/material/badge'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { ListTaskComponent } from './components/list-task/list-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { SharedRoutingModule } from './shared-routing.module';
import { AccountService } from './services/account.service';
import { AlertService } from './services/alert.service';
import { HttpMethodsService } from './services/http-methods.service';
import { LocalStorageService } from './services/local-storage.service';
import { SecurityService } from './services/security.service';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    ListTaskComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatSnackBarModule,
    SharedRoutingModule
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ]
})
export class SharedModule { }
