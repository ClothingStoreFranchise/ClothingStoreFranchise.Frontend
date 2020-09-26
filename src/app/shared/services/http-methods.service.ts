import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SecurityService } from './security.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class HttpMethodsService {
    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: any): Observable<T> {
        return this.http.get(`${environment.apiUrl}`+url, params)
        .pipe(
          tap((res: any) => {
            return res;
        })
        );
    }

    postWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, true, params);
    }

    post(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, false, params);
    }

    putWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPut(url, data, true, params);
    }

    private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {

        return this.http.post(`${environment.apiUrl}`+url, data, params)
            .pipe(
              tap((res: any) => {
                return res;
            })
            );
    }

    delete(url: string, params?: any) {

        this.http.delete(`${environment.apiUrl}`+url, params)
            .subscribe((res) => {console.log('deleted');
        });
    }


    private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {

        return this.http.put(`${environment.apiUrl}`+url, data, params)
        .pipe(
          tap((res: any) => {
            return res;
        })
            );
    }
}
