import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../_general/store/app.state';
import { ToggleHintsAction } from '../_general/store/ui/toggleHints.action';

@Component({
  selector: 'rl-authenticated',
  templateUrl: 'authenticated.component.html',
  styleUrls: ['authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit, OnDestroy {
  routerSub: Subscription;

  constructor (private store: Store<State>, private router: Router) {

  }

  ngOnInit () {
    this.routerSub = this.router.events
      .filter(event => {
        return event instanceof NavigationStart;
      })
      .switchMap(() => this.store
        .map((state: State) => state.ui.hintsVisible).first())
      .filter(hintsVisible => hintsVisible)
      .subscribe(() => {
        this.store.dispatch(new ToggleHintsAction(false));
      });
  }

  ngOnDestroy (): void {
    this.routerSub.unsubscribe();
  }

}
