import {
    Action,
    createReducer,
    on,
} from '@ngrx/store';

import * as Actions from './actions';
import { initialState, EventHubState, eventHubEntity } from './state';

const _reducer = createReducer(
    initialState,
    on(Actions.newEventHub, (state, action) => ({
        ...state,
        eventHubs: eventHubEntity.addOne(action, state.eventHubs),
    })),
    on(Actions.removeEventHub, (state, action) => ({
        ...state,
        eventHubs: eventHubEntity.removeOne(action.id, state.eventHubs),
    })),
    on(Actions.updateEventHub, (state, action) => ({
        ...state,
        eventHubs: eventHubEntity.updateOne({
            changes: action,
            id: action.id,
        }, state.eventHubs),
    })),
);

export function reducer(state: EventHubState, action: Action): EventHubState {
    return _reducer(state, action);
}
