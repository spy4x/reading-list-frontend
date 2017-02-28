/* tslint:disable:only-arrow-functions */
import { Action } from '@ngrx/store';
import { INITIAL_UI_STATE } from './app.state';
import {
  UserSignOutActionType,
  UserSignOutUIActionHandler, UserSignOutAction
} from './user/userSignOut.action';
import {
  UserSignInActionType,
  UserSignInActionHandler, UserSignInAction
} from './user/userSignIn.action';

export function UIReducer (state = INITIAL_UI_STATE, action: Action) {
  switch (action.type) {
    case UserSignInActionType:
      return UserSignInActionHandler(state, action as UserSignInAction);
    case UserSignOutActionType:
      return UserSignOutUIActionHandler(state, action as UserSignOutAction);
    default:
      return state;
  }
}
