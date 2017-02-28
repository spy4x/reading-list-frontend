/* tslint:disable:only-arrow-functions */
import { Action } from '@ngrx/store';
import { INITIAL_DATA_STATE } from './app.state';
import {
  ItemsLoadedActionType,
  ItemsLoadedActionHandler,
  ItemsLoadedAction
} from './items/itemsLoaded.action';
import {
  ItemAddActionType,
  ItemAddActionHandler,
  ItemAddAction
} from './items/itemAdd.action';
import {
  ItemEditActionHandler,
  ItemEditActionType,
  ItemEditAction
} from './items/itemEdit.action';
import {
  ItemRemoveAction,
  ItemRemoveActionHandler,
  ItemRemoveActionType
} from './items/itemRemove.action';
import {
  TagsLoadedActionType,
  TagsLoadedActionHandler,
  TagsLoadedAction
} from './tags/tagsLoaded.action';
import {
  TagAddActionType,
  TagAddActionHandler,
  TagAddAction
} from './tags/tagAdd.action';
import {
  TagEditActionType,
  TagEditActionHandler,
  TagEditAction
} from './tags/tagEdit.action';
import {
  TagRemoveAction,
  TagRemoveActionHandler,
  TagRemoveActionType
} from './tags/tagRemove.action';
import {
  UserSignOutActionType,
  UserSignOutDataActionHandler,
  UserSignOutAction
} from './user/userSignOut.action';

export function DataReducer (state = INITIAL_DATA_STATE, action: Action) {
  switch (action.type) {

    // User //

    case UserSignOutActionType:
      return UserSignOutDataActionHandler(state, action as UserSignOutAction);

    // Items //

    case ItemsLoadedActionType:
      return ItemsLoadedActionHandler(state, action as ItemsLoadedAction);

    case ItemAddActionType:
      return ItemAddActionHandler(state, action as ItemAddAction);

    case ItemEditActionType:
      return ItemEditActionHandler(state, action as ItemEditAction);

    case ItemRemoveActionType:
      return ItemRemoveActionHandler(state, action as ItemRemoveAction);

    // Tags //

    case TagsLoadedActionType:
      return TagsLoadedActionHandler(state, action as TagsLoadedAction);

    case TagAddActionType:
      return TagAddActionHandler(state, action as TagAddAction);

    case TagEditActionType:
      return TagEditActionHandler(state, action as TagEditAction);

    case TagRemoveActionType:
      return TagRemoveActionHandler(state, action as TagRemoveAction);

    default:
      return state;
  }
}
