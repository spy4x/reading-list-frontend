import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Item } from '../../../authenticated/items/item.model';

export const ItemsLoadedActionType = 'ITEMS_LOADED_ACTION';

export class ItemsLoadedAction implements Action {
  readonly type = ItemsLoadedActionType;

  constructor (public payload: Item[] = []) {
  }
}

export const ItemsLoadedActionHandler = (state: DataState,
                                         action: ItemsLoadedAction) => {
  const map = new Map<string, Item>();
  action.payload.forEach(item => map.set(item._id, item));
  return Object.assign({}, state, {items: map});
};
