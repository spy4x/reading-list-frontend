import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Tag } from '../../../tags/tag.model';

export const TagsLoadedActionType = 'TAGS_LOADED_ACTION';

export class TagsLoadedAction implements Action {
  readonly type = TagsLoadedActionType;

  constructor (public payload: Tag[] = []) {
  }
}

export const TagsLoadedActionHandler = (state: DataState,
                                        action: TagsLoadedAction) => {
  const map = new Map<string, Tag>();
  action.payload.forEach(tag => map.set(tag._id, tag));
  return Object.assign({}, state, {tags: map});
};
