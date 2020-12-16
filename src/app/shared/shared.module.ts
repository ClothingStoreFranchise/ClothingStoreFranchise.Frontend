import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatalogService } from './services/catalog.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { SharedRoutingModule } from './shared-routing.module';


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
