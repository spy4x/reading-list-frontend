import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from './user.model';

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

  getUserFromTokenPayload (): User {
    return new JwtHelper().decodeToken(this.getToken());
  }
}
