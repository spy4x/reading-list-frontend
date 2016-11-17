import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Subject, ReplaySubject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { User } from './user.model';

@Injectable()
export class AuthService {
  static authUrl: string = environment.apiUrl + 'auth/google';
  private _currentUser: any;
  public user: Subject<User> = new ReplaySubject<User>(1);

  constructor (private _cookieService: CookieService, private _http: Http, private _router: Router) {
    this._initTokenFromCookie();
  }


  signOut (): void {
    localStorage.removeItem('token');
    this._setCurrentUser(null);
    this._router.navigate(['/']);
  }


  getRequestOptions (): RequestOptions {
    let headers: Headers = new Headers();
    headers.append('authorization', `Bearer ${this._getToken()}`);
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return opts;
  }


  // Private methods

  private _setCurrentUser (value: any) {
    this._currentUser = value;
    this.user.next(value);
  }

  private _initTokenFromCookie () {
    let cookieToken = this._cookieService.get('token');
    if (cookieToken) {
      let cleanToken = cookieToken.replace(new RegExp('"', 'g'), '');
      localStorage.setItem('token', cleanToken);
      this._cookieService.remove('token');
    }
    let token = localStorage.getItem('token');
    if (token) {
      this._loadUser();
    } else {
      this._setCurrentUser(null);
    }
  }

  private _getToken (): string {
    return localStorage.getItem('token');
  }

  private _loadUser (): void {
    this._http
      .get(environment.apiUrl + 'users/me', this.getRequestOptions())
      .subscribe(
        (res: Response) => {
          let u = res.json();
          this._setCurrentUser(new User(u._id, u.name, u.avatar));
        },
        (err: Response) => {
          if (err.status === 401) {
            // Temporary hack
            this.signOut();
            window.location.href = AuthService.authUrl; // sign in again
            // There are no Interceptors in Angular2 HTTP module for v2.2.0
            //  yet. Btw, HTTP should be switched to some REST library, check
            //  issue here: https://github.com/antonshubin/reading-list/issues/1
            //  REST library have to support interceptors.
          } else {
            console.error('AuthService.loadUser() - error:', err);
          }
        });
  }

}
