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
    codeDefinition: string;
    mimicDefinitions: MimicDefintion[];
    sendInterval: FuzzyNumber;
    generatorName?: string;
    running: boolean;
}

export type FuzzyRandomness = [low: number, high: number];

export interface FuzzyNumber {
    value: number;
    randomness: FuzzyRandomness;
}

export const initialState: EventHubState = {
    eventHubs: eventHubEntity.getInitialState(),
};
