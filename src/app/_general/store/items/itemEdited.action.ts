import { Action } from '@ngrx/store';
import { Item } from '../../../authenticated/items/item.model';
import { DataState } from '../app.state';
import { Tag } from '../../../authenticated/tags/tag.model';
import * as _ from 'lodash';

export const ItemEditedActionType = 'ITEM_EDITED_ACTION';

export class ItemEditedAction implements Action {
  readonly type = ItemEditedActionType;

  constructor (public payload: {
    original: Item,
    changes: any,
    updated: Item
  }) {
  }
}

export const ItemEditedActionHandler = (state: DataState,
                                        action: ItemEditedAction) => {
  // for tags removed - do tag.itemsAmount--
  // for tags added - do tag.itemsAmount++
  if (!action.payload.changes.tags) {
    return state;
  }
  const tagsAddedIds: string[] = [];
  const tagsRemovedIds: string[] = [];
  action.payload.changes.tags.forEach((tag: Tag) => {
    if (!action.payload.original.tags
        .find(tagToFind => tagToFind._id === tag._id)) {
      tagsAddedIds.push(tag._id);
    }
  });
  action.payload.original.tags.forEach((tag: Tag) => {
    if (!action.payload.changes.find(tagToFind => tagToFind._id === tag._id)) {
      tagsRemovedIds.push(tag._id);
    }
  });

  const tagsMap = new Map<string, Tag>();
  Array.from(state.tags.values()).forEach((tag: Tag) => {
    if (_.includes(tagsAddedIds, tag._id)) {
      const tagClone = _.cloneDeep(tag);
      tagClone.itemsAmount++;
      return tagsMap.set(tagClone._id, tagClone);
    }
    if (_.includes(tagsRemovedIds, tag._id)) {
      const tagClone = _.cloneDeep(tag);
      tagClone.itemsAmount--;
      return tagsMap.set(tagClone._id, tagClone);
    }
    tagsMap.set(tag._id, tag);

  });
  return Object.assign({}, state, {tags: tagsMap});
};
