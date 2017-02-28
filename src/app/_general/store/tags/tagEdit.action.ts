/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TagsService } from '../../../tags/tags.service';
import { Tag } from '../../../tags/tag.model';
import { Observable } from 'rxjs';
import { TagSavedAction } from './tagSaved.action';
import { TagSaveFailedAction } from './tagSaveFailed.action';

export const TagEditActionType = 'TAG_EDIT_ACTION';

export class TagEditAction implements Action {
  readonly type = TagEditActionType;

  constructor (public payload: {tag: Tag, changes: any}) {
  }
}

export const TagEditActionHandler = (state: DataState,
                                      action: TagEditAction) => {
  const map = new Map<string, Tag>(state.tags);
  map.set(
    action.payload.tag._id,
    Object.assign({}, action.payload.tag, action.payload.changes)
  );
  return Object.assign({}, state, {tags: map});
};

@Injectable()
export class TagEditActionEffect {
  constructor (private actions$: Actions, private tagsService: TagsService) {
  }

  @Effect() editTag$: Observable<Action> = this.actions$
    .ofType(TagEditActionType)
    .switchMap((action: TagEditAction) => {
      return this.tagsService
        .update(action.payload.tag, action.payload.changes)
        .map((tag: Tag) => {
          return new TagSavedAction(tag);
        })
        .catch(error => Observable.of(new TagSaveFailedAction({
          tag: action.payload.tag,
          error
        })));
    });
}
