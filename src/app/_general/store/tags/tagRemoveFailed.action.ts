import { Action } from '@ngrx/store';
import { Tag } from '../../../authenticated/tags/tag.model';

export const TagRemoveFailedActionType = 'TAG_REMOVE_FAILED_ACTION';

export class TagRemoveFailedAction implements Action {
  readonly type = TagRemoveFailedActionType;

  constructor (public payload: {tag: Tag, error: Error}) {
  }
}
