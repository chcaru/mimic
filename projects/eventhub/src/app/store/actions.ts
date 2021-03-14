import {
    createAction,
    props,
} from '@ngrx/store';
import { EventHub } from './state';

const createName = (name: string) => `[EventHub] ${name}`;

export interface NewEventHub extends EventHub {
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

export type UpdateEventHub = Partial<EventHub> & { id: string };

export const updateEventHub = createAction(
    createName('Update Event Hub'),
    props<UpdateEventHub>(),
);

export interface ToggleEventHub {
    id: string;
}

export const toggleEventHub = createAction(
    createName('Toggle Event Hub'),
    props<ToggleEventHub>(),
);
