/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';
import { DataState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TagsService } from '../../../authenticated/tags/tags.service';
import { Tag } from '../../../authenticated/tags/tag.model';
import { Observable } from 'rxjs';
import { generate } from 'shortid';
import { TagSavedAction } from './tagSaved.action';
import { TagSaveFailedAction } from './tagSaveFailed.action';

export const TagAddActionType = 'TAG_ADD_ACTION';

export class TagAddAction implements Action {
  readonly type = TagAddActionType;

  constructor (public payload: Tag) {
    payload._id = generate();
  }
}

export const TagAddActionHandler = (state: DataState,
                                     action: TagAddAction) => {
  const map = new Map<string, Tag>(state.tags);
  map.set(action.payload._id, action.payload);
  return Object.assign({}, state, {tags: map});
};

@Injectable()
export class TagAddActionEffect {

  constructor (private actions$: Actions, private tagsService: TagsService) {
  }

  @Effect() addTag$: Observable<Action> = this.actions$
    .ofType(TagAddActionType)
    .switchMap((action: TagAddAction) => {
      return this.tagsService
        .add(action.payload)
        .map((tag: Tag) => {
          return new TagSavedAction(tag);
        })
        .catch(error => Observable.of(new TagSaveFailedAction({
          tag: action.payload,
          error
        })));
    });
}
