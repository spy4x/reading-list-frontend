/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ItemsService } from '../../../items/items.service';
import { Item } from '../../../items/item.model';
import { Observable } from 'rxjs';
import { ItemRemovedAction } from './itemRemoved.action';
import { ItemRemoveFailedAction } from './itemRemoveFailed.action';

export const ItemRemoveActionType = 'ITEM_REMOVE_ACTION';

export class ItemRemoveAction implements Action {
  readonly type = ItemRemoveActionType;

  constructor (public payload: Item) {
  }
}

export const ItemRemoveActionHandler = (state: DataState,
                                        action: ItemRemoveAction) => {
  const map = new Map<string, Item>(state.items);
  map.delete(action.payload._id);
  return Object.assign({}, state, {items: map});
};

@Injectable()
export class ItemRemoveActionEffect {

  constructor (private actions$: Actions, private itemsService: ItemsService) {
  }

  @Effect() removeItem$: Observable<Action> = this.actions$
    .ofType(ItemRemoveActionType)
    .switchMap((action: ItemRemoveAction) => {
      return this.itemsService
        .remove(action.payload)
        .map(() => {
          return new ItemRemovedAction(action.payload);
        })
        .catch(error => Observable.of(new ItemRemoveFailedAction({
          item: action.payload,
          error
        })));
    });
}
