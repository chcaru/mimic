import { getSelectors } from '@ngrx/router-store';
import {
    createSelector,
} from '@ngrx/store';

import { eventHubEntity, selectApp, selectRouter } from './state';

export const {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectUrl,
} = getSelectors(selectRouter);

const {
    selectAll: _selectAllEventHubs,
    selectEntities: _selectEventHubEntities,
} = eventHubEntity.getSelectors();
const selectEventHubEntity = createSelector(selectApp, state => state.eventHubs);
export const selectEventHubs = createSelector(selectEventHubEntity, _selectAllEventHubs);
export const selectEventHubEntities = createSelector(selectEventHubEntity, _selectEventHubEntities);
export const selectEventHub = (id: string) => createSelector(selectEventHubEntities, entities => entities[id]);

export const selectActiveEventHub = createSelector(
    selectEventHubEntities,
    selectRouteParams,
    (eventHubs, params) => params ? eventHubs[params.eventHubId] : undefined,
);
