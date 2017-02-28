/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TagsService } from '../../../tags/tags.service';
import { Tag } from '../../../tags/tag.model';
import { Observable } from 'rxjs';
import { TagRemovedAction } from './tagRemoved.action';
import { TagRemoveFailedAction } from './tagRemoveFailed.action';

export const TagRemoveActionType = 'TAG_REMOVE_ACTION';

export class TagRemoveAction implements Action {
  readonly type = TagRemoveActionType;

  constructor (public payload: Tag) {
  }
}

export const TagRemoveActionHandler = (state: DataState,
                                        action: TagRemoveAction) => {
  const map = new Map<string, Tag>(state.tags);
  map.delete(action.payload._id);
  return Object.assign({}, state, {tags: map});
};

@Injectable()
export class TagRemoveActionEffect {

  constructor (private actions$: Actions, private tagsService: TagsService) {
  }

  @Effect() removeTag$: Observable<Action> = this.actions$
    .ofType(TagRemoveActionType)
    .switchMap((action: TagRemoveAction) => {
      return this.tagsService
        .remove(action.payload)
        .map(() => {
          return new TagRemovedAction(action.payload);
        })
        .catch(error => Observable.of(new TagRemoveFailedAction({
          tag: action.payload,
          error
        })));
    });
}
