import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router) {
  }

  canActivate (): Observable<boolean> {
    // console.log('NotLoggedInGuard canActivate()');
    return this.auth
      .user
      .take(1)
      .map(user => {
        // console.log('NotLoggedInGuard map user:', user);
        return !user;
      })
      .do(allow => {
        // console.log('NotLoggedInGuard allow:', allow);
        if (!allow) {
          // console.log('NotLoggedInGuard navigate to /items');
          this.router.navigate(['/items']);
        }
      });
  }
}
