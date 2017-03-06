/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import {
  INITIAL_UI_STATE,
  UIState,
  INITIAL_DATA_STATE,
  DataState
} from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

export const UserSignOutActionType = 'USER_SIGN_OUT_ACTION';

export class UserSignOutAction implements Action {
  readonly type = UserSignOutActionType;

  constructor () {
  }
}

export const UserSignOutDataActionHandler = (state: DataState,
                                               action: UserSignOutAction) => {
  return Object.assign({}, state, INITIAL_DATA_STATE);
};

export const UserSignOutUIActionHandler = (state: UIState,
                                             action: UserSignOutAction) => {
  return Object.assign({}, state, INITIAL_UI_STATE);
};

@Injectable()
export class UserSignOutActionEffect {

  constructor (private actions$: Actions,
               private router: Router,
               private auth: AuthService) {
  }

  @Effect({dispatch: false}) removeTails$ = this.actions$
    .ofType(UserSignOutActionType)
    .switchMap(() => {
      this.auth.signOut();
      this.router.navigate(['/public/login']);
      return Observable.of(true);
    });
}

