import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './_general/auth/auth.service';
import { State } from './_general/store/app.state';
import { JwtHelper } from 'angular2-jwt';
import { UserSignInAction } from './_general/store/user/userSignIn.action';

@Component({
  selector: 'rl-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private store: Store<State>, private auth: AuthService) {
    auth.initTokenFromCookie();
    const token = auth.getToken();
    const jwtHelper = new JwtHelper();
    if (token && !jwtHelper.isTokenExpired(token)) {
      this.store.dispatch(new UserSignInAction(jwtHelper.decodeToken(token)));
    }
  }
}
