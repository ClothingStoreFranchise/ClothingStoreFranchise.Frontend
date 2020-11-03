import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatBadgeModule} from '@angular/material/badge'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { SharedRoutingModule } from './shared-routing.module';
import { AccountService } from './services/account.service';
import { AlertService } from './services/alert.service';
import { HttpMethodsService } from './services/http-methods.service';
import { LocalStorageService } from './services/local-storage.service';
import { SecurityService } from './services/security.service';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { CatalogService } from './services/catalog.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export function catalogProviderFactory(provider: CatalogService) {
  return () => provider.loadCategories();
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedRoutingModule
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ]
})
export class SharedModule { }
