import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JwtHelper } from 'angular2-jwt';
import { State } from '../../store/app.state';
import { AuthService } from '../auth.service';
import { UserSignInAction } from '../../store/user/userSignIn.action';
import { UserSignOutAction } from '../../store/user/userSignOut.action';

@Component({
  selector: 'rl-token-interceptor',
  templateUrl: './token-interceptor.component.html',
  styleUrls: ['./token-interceptor.component.sass']
})
export class TokenInterceptorComponent implements OnInit {

  constructor (private store: Store<State>,
               private authService: AuthService,
               private activatedRoute: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit () {
    this.activatedRoute.params
      .subscribe(value => {
        const token = value['token'];
        const jwtHelper = new JwtHelper();
        let isTokenValid = false;
        try {
          isTokenValid = !jwtHelper.isTokenExpired(token);
        } catch (ex) {
        }
        if (isTokenValid) {
          this.authService.setToken(token);
          this.store.dispatch(new
            UserSignInAction(jwtHelper.decodeToken(token)));
          this.router.navigate(['/']);
        } else {
          this.store.dispatch(new UserSignOutAction());
        }
      });
  }
}
