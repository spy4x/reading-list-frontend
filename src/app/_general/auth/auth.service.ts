import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RLCookieService } from '../cookie/cookie.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  static authUrl: string = environment.apiUrl + 'auth/google';
  static tokenKey = 'id_token';

  constructor (private cookieService: RLCookieService) {
  }

  isLoggedIn (): boolean {
    return tokenNotExpired();
  }

  signOut (): void {
    localStorage.removeItem(AuthService.tokenKey);
  }

  getToken (): string {
    return localStorage.getItem(AuthService.tokenKey);
  }


  initTokenFromCookie () {
    const cookieToken = this.cookieService.get('token');
    if (cookieToken) {
      const token = cookieToken.replace(new RegExp('"', 'g'), '');
      localStorage.setItem(AuthService.tokenKey, token);
      this.cookieService.remove('token');
    }
  }


}
