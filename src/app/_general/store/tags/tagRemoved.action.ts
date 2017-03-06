import { Action } from '@ngrx/store';
import { Tag } from '../../../authenticated/tags/tag.model';

export const TagRemovedActionType = 'TAG_REMOVED_ACTION';

export class TagRemovedAction implements Action {
  readonly type = TagRemovedActionType;

  constructor (public payload: Tag) {
  }
}
