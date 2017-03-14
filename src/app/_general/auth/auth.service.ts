import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  static authUrl: string = environment.apiUrl + 'auth/google';
  static tokenKey = 'id_token';

  constructor () {
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

  setToken (token: string): void {
    localStorage.setItem(AuthService.tokenKey, token);
  }


}
