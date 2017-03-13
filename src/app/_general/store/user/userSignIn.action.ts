/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { User } from '../../auth/user.model';
import { UIState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ItemsService } from '../../../authenticated/items/items.service';
import { TagsService } from '../../../authenticated/tags/tags.service';
import { ItemsLoadedAction } from '../items/itemsLoaded.action';
import { TagsLoadedAction } from '../tags/tagsLoaded.action';
import { Tag } from '../../../authenticated/tags/tag.model';
import { Item } from '../../../authenticated/items/item.model';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../_shared/logger/logger.service';

export const UserSignInActionType = 'USER_SIGN_IN_ACTION';

export class UserSignInAction implements Action {
  readonly type = UserSignInActionType;

  constructor (public payload: User) {
  }
}

export const UserSignInActionHandler = (state: UIState,
                                        action: UserSignInAction) => {
  return Object.assign({}, state, {user: action.payload});
};

@Injectable()
export class UserSignInActionEffect {

  constructor (private actions$: Actions,
               private itemsService: ItemsService,
               private tagsService: TagsService,
               private logger: LoggerService) {
  }

  @Effect({dispatch: false}) user$ = this.actions$
    .ofType(UserSignInActionType)
    .switchMap(action => {
      this.logger.setUser(action.payload);
      return Observable.of(true);
    });

  @Effect() items$: Observable<Action> = this.actions$
    .ofType(UserSignInActionType)
    .switchMap(action => this.itemsService.loadItems())
    .map((items: Item[]) => new ItemsLoadedAction(items));

  @Effect() tags$: Observable<Action> = this.actions$
    .ofType(UserSignInActionType)
    .switchMap(action => this.tagsService.loadTags())
    .map((tags: Tag[]) => new TagsLoadedAction(tags));
}
