import {
    createAction,
    props,
} from '@ngrx/store';
import { MimicDefintion } from 'mimic';

const createName = (name: string) => `[EventHub] ${name}`;

export interface NewEventHub {
    id: string;
    name: string;
    connectionString: string;
    mimicDefinitions: MimicDefintion[];
}

export const newEventHub = createAction(
    createName('New Event Hub'),
    props<NewEventHub>(),
);

export interface RemoveEventHub {
    id: string;
}

export const removeEventHub = createAction(
    createName('Remove Event Hub'),
    props<RemoveEventHub>(),
);
