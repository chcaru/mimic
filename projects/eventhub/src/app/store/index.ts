import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { reducer } from './reducer';
import { environment } from '../../environments/environment';

export * from './state';
export * from './actions';

export function logger(reducer: ActionReducer<any>): any {
    return storeLogger({
        collapsed: true,
    })(reducer);
}

export interface State {

}

export const reducers: ActionReducerMap<State> = {
    app: reducer,
};

export const metaReducers: MetaReducer<State>[] = environment.production ? [] : [logger];
