import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './actions';
import * as Selectors from './selectors';

@Injectable({ providedIn: 'root' })
export class StoreFacade {

    public readonly eventHubs$ = this.store.select(Selectors.selectEventHubs);
    public readonly eventHub$ = (id: string) => this.store.select(Selectors.selectEventHub(id));
    public readonly activeEventHub$ = this.store.select(Selectors.selectActiveEventHub);

    constructor(
        private readonly store: Store,
    ) { }

    public newEventHub(newEventHub: Actions.NewEventHub): void {
        this.store.dispatch(Actions.newEventHub(newEventHub));
    }

    public removeEventHub(id: string): void {
        this.store.dispatch(Actions.removeEventHub({ id }));
    }
}
