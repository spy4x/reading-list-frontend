import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { State, UIState } from '../store/app.state';
import { User } from './user.model';
import { UserSignOutAction } from '../store/user/userSignOut.action';
import { UserSignInAction } from '../store/user/userSignIn.action';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor (private auth: AuthService, private router: Router,
               private store: Store<State>) {
  }

  canActivate (): boolean {
    if (!this.auth.isLoggedIn()) {
      this.store.dispatch(new UserSignOutAction());
      return false;
    }

    let user: User;
    const sub = this.store.select<UIState>('ui').subscribe(uiState => {
      user = uiState.user;
    });
    sub.unsubscribe();

    if (!user) {
      this.store.dispatch(new
        UserSignInAction(this.auth.getUserFromTokenPayload()));
    }

    return true;
  }
}
