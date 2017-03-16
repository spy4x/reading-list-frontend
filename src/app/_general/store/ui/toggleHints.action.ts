/* tslint:disable:max-classes-per-file max-line-length */
import { Action } from '@ngrx/store';
import { UIState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { IntroduceService } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

export const ToggleHintsActionType = 'TOGGLE_HINTS_ACTION';

export class ToggleHintsAction implements Action {
  readonly type = ToggleHintsActionType;

  constructor (public payload: boolean) {
  }
}

export const ToggleHintsActionHandler = (state: UIState,
                                         action: ToggleHintsAction) => {
  return Object.assign({}, state, {hintsVisible: action.payload});
};

@Injectable()
export class ToggleHintsActionEffect {

  constructor (private actions$: Actions,
               private introduceService: IntroduceService) {
  }

  @Effect({dispatch: false}) removeHintsHTML$ = this.actions$
    .ofType(ToggleHintsActionType)
    .filter(action => !action.payload)
    .do(action => this.introduceService.removeHints());
}
