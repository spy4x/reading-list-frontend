import { Action } from '@ngrx/store';
import { Item } from '../../../authenticated/items/item.model';
import { DataState } from '../app.state';
import { Tag } from '../../../authenticated/tags/tag.model';
import * as _ from 'lodash';

export const ItemAddedActionType = 'ITEM_ADDED_ACTION';

export class ItemAddedAction implements Action {
  readonly type = ItemAddedActionType;

  constructor (public payload: Item) {
  }
}

export const ItemAddedActionHandler = (state: DataState,
                                       action: ItemAddedAction) => {
  const tagIds = action.payload.tags.map(tag => tag._id);
  const tagsMap = new Map<string, Tag>();
  Array.from(state.tags.values()).forEach((tag: Tag) => {
    if (_.includes(tagIds, tag._id)) {
      const tagClone = _.cloneDeep(tag);
      tagClone.itemsAmount++;
      tagsMap.set(tagClone._id, tagClone);
    } else {
      tagsMap.set(tag._id, tag);
    }
  });
  return Object.assign({}, state, {tags: tagsMap});
};
