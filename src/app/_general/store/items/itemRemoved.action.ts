import { Action } from '@ngrx/store';
import { Item } from '../../../items/item.model';

export const ItemRemovedActionType = 'ITEM_REMOVED_ACTION';

export class ItemRemovedAction implements Action {
  readonly type = ItemRemovedActionType;

  constructor (public payload: Item) {
  }
}
