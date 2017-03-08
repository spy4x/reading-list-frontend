import { Action } from '@ngrx/store';
import { Item } from '../../../authenticated/items/item.model';

export const ItemAddFailedActionType = 'ITEM_ADD_FAILED_ACTION';

export class ItemAddFailedAction implements Action {
  readonly type = ItemAddFailedActionType;

  constructor (public payload: {item: Item, error: Error}) {
  }
}
