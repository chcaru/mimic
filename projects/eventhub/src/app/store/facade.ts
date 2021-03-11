import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './actions';

@Injectable({ providedIn: 'root' })
export class StoreFacade {

    constructor(
        private readonly store: Store,
    ) { }
}
