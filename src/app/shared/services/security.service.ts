import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders }      from '@angular/common/http';
import { Observable, Subject }          from 'rxjs';
import { Router }                       from '@angular/router';
import { ActivatedRoute }               from '@angular/router';
import { LocalStorageService }          from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SecurityService {

  private actionUrl: string;
  private headers: HttpHeaders;
  private storage: LocalStorageService;
  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();

  constructor(private _http: HttpClient, private _router: Router, private route: ActivatedRoute, private _storageService: LocalStorageService) {
      this.headers = new HttpHeaders();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Accept', 'application/json');
      this.storage = _storageService;

      if (this.storage.get('IsAuthorized') !== '') {
          this.IsAuthorized = this.storage.get('IsAuthorized');
          this.authenticationSource.next(true);
          this.UserData = this.storage.get('userData');
      }
  }

  public IsAuthorized: boolean;

  public GetToken(): any {
    return this.storage.get('jwt');
  }

  public ResetAuthorizationData() {
    this.storage.set('authorizationData', '');
    this.storage.set('authorizationDataIdToken', '');

    this.IsAuthorized = false;
    this.storage.set('IsAuthorized', false);
  }

  public UserData: any;
/*
  public SetAuthorizationData(token: any, id_token: any) {
    if (this.storage.get('authorizationData') !== '') {
        this.storage.set('authorizationData', '');
    }

    this.storage.set('authorizationData', token);
    this.storage.set('authorizationDataIdToken', id_token);
    this.IsAuthorized = true;
    this.storage.set('IsAuthorized', true);

    this.getUserData()
      .subscribe(data => {
          this.UserData = data;
          this.storage.set('userData', data);
          // emit observable
          this.authenticationSource.next(true);
          window.location.href = location.origin;
      },
      error => this.HandleError(error),
      () => {
          console.log(this.UserData);
      });
  }
*/

  public HandleError(error: any) {
    console.log(error);
    if (error.status == 403) {
        this._router.navigate(['/Forbidden']);
    }
    else if (error.status == 401) {
        // this.ResetAuthorizationData();
        this._router.navigate(['/Unauthorized']);
    }
  }

  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  /*private getUserData = (): Observable<string[]> => {

    const options = this.setHeaders();

    return this._http.get<string[]>(`${environment.apiUrl}/connect/userinfo`, options)
        .pipe<string[]>((info: any) => info);
  }*/

  private setHeaders(): any {
    const httpOptions = {
        headers: new HttpHeaders()
    };

    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');

    const token = this.GetToken();

    if (token !== '') {
        httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }

    return httpOptions;
  }
}
