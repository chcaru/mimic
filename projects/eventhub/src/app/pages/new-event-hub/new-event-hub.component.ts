import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { MimicDefintion } from 'mimic';

import { StoreFacade } from '../../store/facade';

@Component({
    templateUrl: './new-event-hub.component.html',
    styleUrls: ['./new-event-hub.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventHubComponent {

    public readonly exampleMimic = `
// Mimic lets you generate mock data using TypeScript
// On the right is sample output for what's defined below (try and edit it)

interface Name {
    firstName: asFirstName; // Use built in mock data generators. These start with "as", see auto complete for more
    lastName: asLastName;
}

interface Address {
    address: asStreetAddress;
    secondaryAddress?: asSecondaryAddress; // Properties can be optional. These have a 50% chance of being undefined
}

interface BitcoinWallet {
    type: 'bitcoin'; // Use type literals for static data
    bitcoinAddress: string; // Auto detect mock data
}

interface EtheriumWallet {
    type: 'etherium';
    etheriumAddress: string;
}

interface Person {
    name: Name; // Reference other defined types
    address: Address;
    digitalWallet?: BitcoinWallet | EtheriumWallet; // Union types for an equal chance at any of them
    age: asNumberRange<20, 30>; // Some mock data generators can take parameters to customize them.
    image?: Sometimes<.75, asImagePeople>; // Sometimes is a special type that lets you specify the chance a value will be undefined
}

interface Team {
    members: BoundArray<Person, 6, 2>; // BoundArray is a special type that lets you specify the range of an array
    // members: Person[]; // Arrays have a random range of 0 to 10 elements
}
`;
    public mimicDefinitions: MimicDefintion[] = [];
    public codeDefinition: string;

    constructor(
        private readonly facade: StoreFacade,
        private readonly router: Router,
    ) { }

    public add(name: string, connectionString: string): void {
        if (name.length && connectionString.length) {
            const id = uuidv4();
            this.facade.newEventHub({
                id,
                name,
                connectionString,
                mimicDefinitions: this.mimicDefinitions,
                codeDefinition: this.codeDefinition,
            });
            this.router.navigate(['event-hubs', id]);
        }
    }
}