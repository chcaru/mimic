import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MimicDefintion } from 'mimic';

import { StoreFacade } from '../../store/facade';

@Component({
    templateUrl: './event-hub.component.html',
    styleUrls: ['./event-hub.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHubComponent {

    public readonly eventHub$ = this.facade.activeEventHub$;

    constructor(
        public readonly facade: StoreFacade,
    ) { }

    public updateCodeDefinition(id: string, codeDefinition: string): void {
        this.facade.updateEventHub({
            id,
            codeDefinition,
        });
    }

    public updateDefinitions(id: string, mimicDefinitions: MimicDefintion[]): void {
        this.facade.updateEventHub({
            id,
            mimicDefinitions,
        });
    }
}
