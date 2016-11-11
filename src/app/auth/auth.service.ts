import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Subject, ReplaySubject } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private _currentUser: any;
  public user: Subject<User> = new ReplaySubject<User>(1);

  constructor (private _cookieService: CookieService, private _http: Http, private _router: Router) {
    this._initTokenFromCookie();
  }

  getAuthUrl (): string {
    return environment.apiUrl + 'auth/google';
  }

  signOut (): void {
    // console.log('AuthService::signOut()');
    localStorage.removeItem('token');
    this.setCurrentUser(null);
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

  private setCurrentUser (value: any) {
    // console.log('AuthService setCurrentUser:', value);
    this._currentUser = value;
    this.user.next(value);
  }

  private _initTokenFromCookie () {
    let cookieToken = this._cookieService.get('token');
    if (cookieToken) {
      let cleanToken = cookieToken.replace(new RegExp('"', 'g'), '');
      // console.log('token', cleanToken);
      localStorage.setItem('token', cleanToken);
      this._cookieService.remove('token');
    }
    let token = localStorage.getItem('token');
    if (token) {
      this.loadUser();
    } else {
      this.setCurrentUser(null);
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
          this.setCurrentUser(new User(u._id, u.name, u.avatar));
        },
        (err: Response) => {
          console.error('AuthService.loadUser() - error:', err);
        });
  }

}
