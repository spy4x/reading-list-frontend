import { Action } from '@ngrx/store';
import { Item } from '../../../authenticated/items/item.model';

export const ItemSaveFailedActionType = 'ITEM_SAVE_FAILED_ACTION';

export class ItemSaveFailedAction implements Action {
  readonly type = ItemSaveFailedActionType;

  constructor (public payload: {item: Item, error: Error}) {
  }
}
