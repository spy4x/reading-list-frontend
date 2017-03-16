import { Item } from '../../authenticated/items/item.model';
import { Tag } from '../../authenticated/tags/tag.model';
import { User } from '../auth/user.model';
import { RouterState } from '@ngrx/router-store';

export type UIState = {
  user: User,
  filter: string,
  hintsVisible: boolean
};

export type DataState = {
  items: Map<string, Item>;
  tags: Map<string, Tag>;
};

export interface State {
  data: DataState;
  router: RouterState;
  ui: UIState;
}

export const INITIAL_DATA_STATE: DataState = {
  items: new Map<string, Item>(),
  tags: new Map<string, Tag>()
};
export const INITIAL_UI_STATE: UIState = {
  user: undefined,
  filter: '',
  hintsVisible: false
};

export const INITIAL_STATE: State = {
  data: INITIAL_DATA_STATE,
  router: {
    path: '/'
  },
  ui: INITIAL_UI_STATE
};
