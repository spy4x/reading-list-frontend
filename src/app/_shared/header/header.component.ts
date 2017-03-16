import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UIState, State } from '../../_general/store/app.state';
import { User } from '../../_general/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rl-shared-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class SharedHeaderComponent implements OnInit, OnDestroy {
  user: User;
  uiStateSub: Subscription;

  constructor (private store: Store<State>) {
  }

  ngOnInit () {
    this.uiStateSub = this.store.select<UIState>('ui')
      .map(uiState => uiState.user)
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy (): void {
    this.uiStateSub.unsubscribe();
  }
}
