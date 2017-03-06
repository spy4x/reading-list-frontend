import { Action } from '@ngrx/store';
import { Tag } from '../../../authenticated/tags/tag.model';

export const TagSaveFailedActionType = 'TAG_SAVE_FAILED_ACTION';

export class TagSaveFailedAction implements Action {
  readonly type = TagSaveFailedActionType;

  constructor (public payload: {tag: Tag, error: Error}) {
  }
}
