/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ItemsService } from '../../../authenticated/items/items.service';
import { Item } from '../../../authenticated/items/item.model';
import { Observable } from 'rxjs';
import { generate } from 'shortid';
import { ItemSavedAction } from './itemSaved.action';
import { ItemSaveFailedAction } from './itemSaveFailed.action';

export const ItemAddActionType = 'ITEM_ADD_ACTION';

export class ItemAddAction implements Action {
  readonly type = ItemAddActionType;

  constructor (public payload: Item) {
    payload._id = generate();
  }
}

export const ItemAddActionHandler = (state: DataState,
                                     action: ItemAddAction) => {
  const map = new Map<string, Item>(state.items);
  map.set(action.payload._id, action.payload);
  return Object.assign({}, state, {items: map});
};

@Injectable()
export class ItemAddActionEffect {

  constructor (private actions$: Actions, private itemsService: ItemsService) {
  }

  @Effect() addItem$: Observable<Action> = this.actions$
    .ofType(ItemAddActionType)
    .switchMap((action: ItemAddAction) => {
      return this.itemsService
        .add(action.payload)
        .map((item: Item) => {
          return new ItemSavedAction(item);
        })
        .catch(error => Observable.of(new ItemSaveFailedAction({
          item: action.payload,
          error
        })));
    });
}
