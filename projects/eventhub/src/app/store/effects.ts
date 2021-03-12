import { Injectable } from '@angular/core';
import { INIT } from '@ngrx/store';
import { Actions as NgRxAction, createEffect, ofType } from '@ngrx/effects';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';

import * as Actions from './actions';
import { EventHubService } from '../services/event-hub.service';
import { StoreFacade } from './facade';

@Injectable()
export class AppEffects {

    public readonly toggleEventHub$ = createEffect(
        () => this.actions$.pipe(
            ofType(Actions.toggleEventHub, Actions.removeEventHub),
            withLatestFrom(this.facade.state$),
            tap(([action, state]) => state.eventHubs.entities[action.id].running
                ? this.eventHubService.startJob(state.eventHubs.entities[action.id])
                : this.eventHubService.stopJob(action.id),
            ),
        ),
        { dispatch: false },
    );

    public readonly updateEventHubWhileRunning = createEffect(
        () => this.actions$.pipe(
            ofType(Actions.updateEventHub),
            withLatestFrom(this.facade.state$),
            map(([action, state]) => state.eventHubs.entities[action.id]),
            filter(eventHub => eventHub.running),
            tap(eventHub => this.eventHubService.startJob(eventHub)),
        ),
        { dispatch: false },
    );

    public readonly init$ = createEffect(
        () => this.facade.state$.pipe(
            filter(state => !!state),
            take(1),
            tap(state => {
                for (const eventHubId of state.eventHubs.ids) {
                    const eventHub = state.eventHubs.entities[eventHubId];
                    if (eventHub.running) {
                        this.eventHubService.startJob(eventHub);
                    }
                }
            }),
        ),
        { dispatch: false },
    );

    constructor(
        private readonly facade: StoreFacade,
        private readonly actions$: NgRxAction,
        private readonly eventHubService: EventHubService,
    ) { }
}
