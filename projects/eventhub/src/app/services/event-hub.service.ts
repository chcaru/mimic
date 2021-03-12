import { Injectable } from '@angular/core';
import { defer, EMPTY, from, interval, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { catchError, map, repeat, shareReplay, switchMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { mimicGenerators } from 'mimic';
import { EventHubProducerClient } from '@azure/event-hubs';

import { EventHub } from '../store';

interface OutputContext<T> {
    subject$: Subject<Observable<T>>;
    observable$: Observable<T>;
}

// interface EventHubConnectionInfo {
//     entityPath: string;
//     key: string;
//     keyName: string;
//     name: string;
// }

// const entityPath = /EntityPath=([^;]+);?/;
// const eventHubName = /Endpoint=sb:\/\/([^.]+)\.servicebus\.windows\.net\/;?/;
// const key = /SharedAccessKey=([^;]+);?/;
// const keyName = /SharedAccessKeyName=([^;]+);?/;

// const getEventHubConnectionInfo = (eventHubConnectionString: string) => ({
//     entityPath: entityPath.exec(eventHubConnectionString)[1],
//     key: key.exec(eventHubConnectionString)[1],
//     keyName: keyName.exec(eventHubConnectionString)[1],
//     name: eventHubName.exec(eventHubConnectionString)[1],
// });

// const expirationBuffer = 1000 * 60 * 60 * 24 * 7;

// const getSASToken = (connectionInfo: EventHubConnectionInfo) => `SharedAccessSignature sr=${connectionInfo.name}.servicebus.windows.net&sig=${connectionInfo.key}&se=${Date.now() + expirationBuffer}&skn=${connectionInfo.keyName}`;

@Injectable({ providedIn: 'root' })
export class EventHubService {

    private readonly subscriptions: Record<string, Subscription> = {};
    private readonly outputContexts: Record<string, OutputContext<any>> = {};
    private readonly clients: Record<string, EventHubProducerClient> = {};

    public getOutput$<T>(id: string): Observable<T> {
        const output = this.getOutputContext<T>(id);
        return output.observable$;
    }

    public startJob(eventHub: EventHub): void {

        if (!eventHub.generatorName) {
            return;
        }

        const { generatorMap } = mimicGenerators(eventHub.mimicDefinitions || []);
        const generator = generatorMap[eventHub.generatorName];

        if (!generator) {
            return;
        }

        this.stopJob(eventHub.id);

        // const connectionInfo = getEventHubConnectionInfo(eventHub.connectionString);

        const id = eventHub.id;
        const client = this.clients[id] = new EventHubProducerClient(eventHub.connectionString);
        const output$ = defer(() => interval(this.getInterval(eventHub)).pipe(
            take(1),
            map(generator),
            // switchMap(event => this.sendEvent$(connectionInfo, event).pipe(
            switchMap(event => from(client.sendBatch([{ body: event }])).pipe(
                map(() => event),
            )),
            repeat(),
        ));
        const outputContext = this.getOutputContext<any>(eventHub.id);
        outputContext.subject$.next(output$);
        this.subscriptions[id] = output$.subscribe();
    }

    public stopJob(id: string): void {
        if (this.subscriptions[id]) {
            this.subscriptions[id].unsubscribe();
            this.subscriptions[id] = undefined;
        }
        if (this.clients[id]) {
            this.clients[id].close();
            this.clients[id] = undefined;
        }
        if (this.outputContexts[id]) {
            this.outputContexts[id].subject$.next(EMPTY);
        }
    }

    private getOutputContext<T>(id: string): OutputContext<T> {
        let output = this.outputContexts[id];
        if (!output) {
            const subject$ = new ReplaySubject<Observable<T>>(1);
            const observable$ = subject$.pipe(
                switchMap(x$ => x$),
                catchError(() => EMPTY),
            );
            output = this.outputContexts[id] = {
                subject$,
                observable$,
            };
        }
        return output;
    }

    // private sendEvent$(connectionInfo: EventHubConnectionInfo, event: unknown) {
    //     console.log('Sending', connectionInfo, event);
    //     return ajax({
    //         method: 'POST',
    //         url: `https://${connectionInfo.name}.servicebus.windows.net/${connectionInfo.entityPath}/messages?timeout=60`,
    //         headers: {
    //             Authorization: getSASToken(connectionInfo),
    //             'Content-Type': 'application/json; charset=UTF-8',
    //         },
    //         body: JSON.stringify(event),
    //     });
    // }

    private getInterval({ sendInterval }: EventHub): number {
        const randomness = (sendInterval.randomness[1] - sendInterval.randomness[0]) * Math.random();
        const adjusted = sendInterval.randomness[0] + randomness;
        return sendInterval.value + adjusted;
    }
}
