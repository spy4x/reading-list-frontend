import { Action } from '@ngrx/store';
import { Item } from '../../../authenticated/items/item.model';

export const ItemEditFailedActionType = 'ITEM_EDIT_FAILED_ACTION';

export class ItemEditFailedAction implements Action {
  readonly type = ItemEditFailedActionType;

  constructor (public payload: {item: Item, error: Error}) {
  }
}
