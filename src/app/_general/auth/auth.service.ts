import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { MineCookieService } from '../cookie/cookie.service';
import { User } from './user.model';

@Injectable()
export class AuthService {
  static authUrl: string = environment.apiUrl + 'auth/google';
  public user: Subject<User> = new ReplaySubject<User>(1);

  constructor (private cookieService: MineCookieService,
               private http: Http,
               private router: Router) {
    this.initTokenFromCookie();
  }


  signOut (): void {
    localStorage.removeItem('token');
    this.setCurrentUser(undefined);
    this.router.navigate(['/login']);
  }


  getRequestOptions (): RequestOptions {
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${this.getToken()}`);
    headers.append('Content-Type', 'application/json; charset=utf-8');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return opts;
  }


  // Private methods

  private setCurrentUser (user: User | undefined): void {
    this.user.next(user);
  }

  private initTokenFromCookie () {
    const cookieToken = this.cookieService.get('token');
    if (cookieToken) {
      const cleanToken = cookieToken.replace(new RegExp('"', 'g'), '');
      localStorage.setItem('token', cleanToken);
      this.cookieService.remove('token');
    }
    const token = localStorage.getItem('token');
    if (token) {
      this.loadUser();
    } else {
      this.setCurrentUser(undefined);
    }
  }

  private getToken (): string {
    return localStorage.getItem('token');
  }

  private loadUser (): void {
    this.http
      .get(environment.apiUrl + 'users/me', this.getRequestOptions())
      .subscribe(
        (res: Response) => {
          const user = res.json();
          this.setCurrentUser({
            _id: user._id,
            name: user.name,
            avatarURL: user.avatarURL
          });
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
