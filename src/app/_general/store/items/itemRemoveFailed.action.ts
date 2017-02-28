import { Action } from '@ngrx/store';
import { Item } from '../../../items/item.model';

export const ItemRemoveFailedActionType = 'ITEM_REMOVE_FAILED_ACTION';

export class ItemRemoveFailedAction implements Action {
  readonly type = ItemRemoveFailedActionType;

  constructor (public payload: {item: Item, error: Error}) {
  }
}
