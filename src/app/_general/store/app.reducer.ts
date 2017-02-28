/* tslint:disable:only-arrow-functions */
import { compose } from '@ngrx/core';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { State } from './app.state';
import { storeLogger } from 'ngrx-store-logger';
import { UIReducer } from './ui.reducer';
import { DataReducer } from './data.reducer';


const reducers = {
  data: DataReducer,
  ui: UIReducer,
  router: routerReducer
};

const developmentReducer: ActionReducer<State> =
  compose(storeFreeze, storeLogger(), combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function StoreReducer (state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
