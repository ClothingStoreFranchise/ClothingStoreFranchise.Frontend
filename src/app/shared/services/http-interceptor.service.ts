import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add auth header with jwt if user is logged in and request is to the api url
    const token = this.localStorageService.get('jwt');
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (token != null && isApiUrl) {

        request = request.clone({
            setHeaders: {
                Authorization: token
            }
        });
      }
        return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
          })
        )
  }
}
