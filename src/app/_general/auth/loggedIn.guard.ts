import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor (private auth: AuthService, private router: Router) {
  }

  canActivate (): Observable<boolean> {
    return this.auth
      .user
      .take(1)
      .map(user => !!user)
      .do(allow => !allow && this.router.navigate(['/']));
  }
}
