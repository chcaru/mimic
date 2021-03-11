import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';

import { reducer } from './reducer';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { RouterState } from '@angular/router';

export * from './state';
export * from './actions';

export function logger(reducer: ActionReducer<any>): any {
    return storeLogger({
        collapsed: true,
    })(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['app'],
        rehydrate: true,
    })(reducer);
  }

export interface AppState {
    app: any;
    router: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
    app: reducer,
    router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
    ? [localStorageSyncReducer]
    : [localStorageSyncReducer, logger];
