import { Action } from '@ngrx/store';
import { Tag } from '../../../authenticated/tags/tag.model';

export const TagSavedActionType = 'TAG_SAVED_ACTION';

export class TagSavedAction implements Action {
  readonly type = TagSavedActionType;

  constructor (public payload: Tag) {
  }
}
