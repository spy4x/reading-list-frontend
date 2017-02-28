import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../_general/auth/user.model';
import { UIState, State } from '../../_general/store/app.state';
/* tslint:disable:max-line-length */
import { UserSignOutAction } from '../../_general/store/user/userSignOut.action';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  user: User;

  constructor (private store: Store<State>) {
  }

  ngOnInit () {
    this.store.select('ui')
      .subscribe((uiState: UIState) => this.user = uiState.user);
  }

  signOut (): void {
    this.store.dispatch(new UserSignOutAction());
  }

}
