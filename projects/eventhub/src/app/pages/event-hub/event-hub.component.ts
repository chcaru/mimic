import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EditorOptions, NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { of, Subject } from 'rxjs';
import { debounceTime, map, pairwise, scan, switchMap, tap, timestamp } from 'rxjs/operators';
import { EventHubService } from '../../services/event-hub.service';

import { UpdateEventHub } from '../../store';
import { StoreFacade } from '../../store/facade';

@Component({
    templateUrl: './event-hub.component.html',
    styleUrls: ['./event-hub.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHubComponent {

    @ViewChild('outputEditor')
    public outputEditor?: NzCodeEditorComponent;

    public readonly eventHub$ = this.facade.activeEventHub$;
    public readonly output$ = this.eventHub$.pipe(
        switchMap(activeEventHub => activeEventHub
            ? this.eventHubService.getOutput$(activeEventHub.id)
            : of(undefined),
        ),
        map(event => JSON.stringify(event, null, 4)),
    );

    public readonly data$ = this.output$.pipe(
        timestamp(),
        pairwise(),
        map(([a, b]) => ({
            value: b.timestamp - a.timestamp ?
                1000 / (b.timestamp - a.timestamp)
                : 0,
            name: new Date(a.timestamp).toISOString(),
        })),
        scan(
            ([data], datum) => {
                data.series.push(datum);
                if (data.series.length > 100) {
                    data.series.shift();
                }
                return [data];
            },
            [{name: 'Events per second', series: []}],
        ),
        tap(() => this.changeDetectorRef.detectChanges()),
    );

    public readonly scheme = {
        domain: ['#177ddc'],
    };

    public readonly editorOptions: EditorOptions = {
        language: 'json',
        theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
    };

    private readonly updateEventHub$ = new Subject<UpdateEventHub>();
    private readonly updateSub = this.updateEventHub$.pipe(
        debounceTime(2500),
        tap(update => this.facade.updateEventHub(update)),
    ).subscribe();

    constructor(
        public readonly facade: StoreFacade,
        private readonly eventHubService: EventHubService,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) { }

    public ngOnDestroy(): void {
        this.updateSub.unsubscribe();
    }
}
