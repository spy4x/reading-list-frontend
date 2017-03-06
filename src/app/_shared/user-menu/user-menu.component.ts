import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../_general/auth/user.model';
import { UIState, State } from '../../_general/store/app.state';
/* tslint:disable:max-line-length */
import { UserSignOutAction } from '../../_general/store/user/userSignOut.action';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { Subscription } from 'rxjs';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  user: User;
  url: any;

  private routeParamsSub: Subscription;

  constructor (private store: Store<State>,
               private route: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit () {
    this.routeParamsSub = this.route.url
      .combineLatest(this.store.select('ui'))
      .subscribe((values: [UrlSegment[], UIState]) => {
        this.url = this.router.url;
        this.user = values[1].user;
      });
  }

  ngOnDestroy () {
    this.routeParamsSub.unsubscribe();
  }

  signOut (): void {
    this.store.dispatch(new UserSignOutAction());
  }

}
