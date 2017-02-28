import { Action } from '@ngrx/store';
import { Item } from '../../../items/item.model';

export const ItemSavedActionType = 'ITEM_SAVED_ACTION';

export class ItemSavedAction implements Action {
  readonly type = ItemSavedActionType;

  constructor (public payload: Item) {
  }
}
