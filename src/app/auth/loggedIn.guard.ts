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
    // console.log('LoggedInGuard canActivate()');
    return this.auth
      .user
      .take(1)
      .map(user => {
        // console.log('LoggedInGuard map user:', user);
        return !!user;
      })
      .do(allow => {
        // console.log('LoggedInGuard allow:', allow);
        if (!allow) {
          // console.log('LoggedInGuard navigate to /');
          this.router.navigate(['/']);
        }
      });
  }
}
