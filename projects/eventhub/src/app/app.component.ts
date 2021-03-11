import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StoreFacade } from './store/facade';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public isCollapsed = false;

    constructor(
        public readonly facade: StoreFacade,
    ) { }
}
