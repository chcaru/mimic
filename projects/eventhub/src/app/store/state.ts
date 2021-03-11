import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { MimicDefintion } from 'mimic';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');
export const selectApp = createFeatureSelector<EventHubState>('app');

export const eventHubEntity = createEntityAdapter<EventHub>();


export interface EventHubState {
    eventHubs: EntityState<EventHub>;
}

export interface EventHub {
    id: string;
    name: string;
    connectionString: string;
    mimicDefinitions: MimicDefintion[];
}

export const initialState: EventHubState = {
    eventHubs: eventHubEntity.getInitialState(),
};
