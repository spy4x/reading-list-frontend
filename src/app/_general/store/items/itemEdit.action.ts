/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ItemsService } from '../../../items/items.service';
import { Item } from '../../../items/item.model';
import { Observable } from 'rxjs';
import { ItemSavedAction } from './itemSaved.action';
import { ItemSaveFailedAction } from './itemSaveFailed.action';

export const ItemEditActionType = 'ITEM_EDIT_ACTION';

export class ItemEditAction implements Action {
  readonly type = ItemEditActionType;

  constructor (public payload: {item: Item, changes: any}) {
  }
}

export const ItemEditActionHandler = (state: DataState,
                                      action: ItemEditAction) => {
  const map = new Map<string, Item>(state.items);
  map.set(
    action.payload.item._id,
    Object.assign({}, action.payload.item, action.payload.changes)
  );
  return Object.assign({}, state, {items: map});
};

@Injectable()
export class ItemEditActionEffect {
  constructor (private actions$: Actions, private itemsService: ItemsService) {
  }

  @Effect() editItem$: Observable<Action> = this.actions$
    .ofType(ItemEditActionType)
    .switchMap((action: ItemEditAction) => {
      return this.itemsService
        .update(action.payload.item, action.payload.changes)
        .map((item: Item) => {
          return new ItemSavedAction(item);
        })
        .catch(error => Observable.of(new ItemSaveFailedAction({
          item: action.payload.item,
          error
        })));
    });
}
