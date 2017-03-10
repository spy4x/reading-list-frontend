import { Action } from '@ngrx/store';
import { Tag } from '../../../authenticated/tags/tag.model';
import { DataState } from '../app.state';
import { Item } from '../../../authenticated/items/item.model';
import * as _ from 'lodash';

export const TagRemovedActionType = 'TAG_REMOVED_ACTION';

export class TagRemovedAction implements Action {
  readonly type = TagRemovedActionType;

  constructor (public payload: Tag) {
  }
}

export const TagRemovedActionHandler = (state: DataState,
                                        action: TagRemovedAction) => {
  const itemsMap = new Map<string, Item>();
  Array.from(state.items.values()).forEach(item => {
    const index = item.tags.findIndex(tag => tag._id === action.payload._id);
    if (index === -1) {
      return itemsMap.set(item._id, item);
    }
    const itemClone = _.cloneDeep(item);
    itemClone.tags.splice(index, 1);
    itemsMap.set(item._id, itemClone);
  });
  return Object.assign({}, state, {items: itemsMap});
};
