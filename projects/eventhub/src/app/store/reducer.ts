import {
    Action,
    createReducer,
    on,
} from '@ngrx/store';

import * as Actions from './actions';
import { initialState, State } from './state';

const _reducer = createReducer(
    initialState,
    // on(increment, state => state + 1),
);

export function reducer(state: State, action: Action): State {
    return _reducer(state, action);
}
