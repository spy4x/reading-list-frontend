import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class AuthService {

  private _user: any;
  public user: Subject<User> = new BehaviorSubject<User>(null);

  constructor (private _cookieService: CookieService, private _http: Http) {
    this._initTokenFromCookie();
  }

  getAuthUrl (): string {
    return environment.apiUrl + 'auth/google';
  }

  signOut (): void {
    localStorage.removeItem('token');
    this._user = null;
    this.user.next(null);
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

  private _initTokenFromCookie () {
    let cookieToken = this._cookieService.get('token');
    if (cookieToken) {
      let cleanToken = cookieToken.replace(new RegExp('"', 'g'), '');
      console.log('token', cleanToken);
      localStorage.setItem('token', cleanToken);
      this._cookieService.remove('token');
    }
    let token = localStorage.getItem('token');
    if (token) {
      this.loadUser();
    }
  }

  private _getToken (): string {
    return localStorage.getItem('token');
  }

  private loadUser (): void {
    this._http
      .get(environment.apiUrl + 'users/me', this.getRequestOptions())
      .subscribe(
        (res: Response) => {
          let u = res.json();
          this._user = new User(u._id, u.name, u.avatar);
          this.user.next(this._user);
        },
        (err: Response) => {
          console.error('AuthService.loadUser() - error:', err);
        });
  }

}
