import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../_general/auth/user.model';
import { UIState, State } from '../../_general/store/app.state';
/* tslint:disable:max-line-length */
import { UserSignOutAction } from '../../_general/store/user/userSignOut.action';
import { Subscription } from 'rxjs';
import { ToggleHintsAction } from '../../_general/store/ui/toggleHints.action';
import { IntroConfig } from '../_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  user: User;
  hintsVisible: boolean;
  uiStateSub: Subscription;

  constructor (private store: Store<State>) {
  }

  ngOnInit () {
    this.uiStateSub = this.store.select<UIState>('ui')
      .subscribe(uiState => {
        this.user = uiState.user;
        this.hintsVisible = uiState.hintsVisible;
      });
  }

  ngOnDestroy () {
    this.uiStateSub.unsubscribe();
  }

  signOut (): void {
    this.store.dispatch(new UserSignOutAction());
  }

  showHints (): void {
    this.store.dispatch(new ToggleHintsAction(!this.isAnyHintVisible()));
  }

  isAnyHintVisible (): boolean {
    const selector = '.introjs-hint:not(.introjs-hidehint)';
    const isAnyHintvisible = !!document.querySelector(selector);
    return this.hintsVisible && isAnyHintvisible;
  }

}

export const userMenuComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [{
    element: 'rl-user-menu img',
    hint: 'Here you can get help via hints, read about the app and sign out',
    hintPosition: 'top-middle',
    position: 'auto'
  }]
};
