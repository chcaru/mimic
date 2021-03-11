import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import type { EditorOptions, NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import type * as m from 'monaco-editor';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MimicLib, mimicDefinitions, mimicGenerators, MimicDefintion } from 'mimic';

import { StoreFacade } from '../../store/facade';
import { Router } from '@angular/router';

declare const monaco: typeof m;

@Component({
    templateUrl: './new-event-hub.component.html',
    styleUrls: ['./new-event-hub.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventHubComponent {

    @ViewChild('outputEditor')
    private readonly outputEditor: NzCodeEditorComponent;

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

    public readonly editorOptions: EditorOptions = {
        language: 'typescript',
        theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
    };

    public readonly output$ = new BehaviorSubject<string>('');

    public editorLoading = true;
    public definitions: MimicDefintion[] = [];

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
                mimicDefinitions: this.definitions,
            });
            this.router.navigate(['event-hubs', id]);
        }
    }

    public editorInit(): void {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(MimicLib.lib);
        this.editorLoading = false;
        setTimeout(() => this.setOutput(this.exampleMimic));
    }

    public defintionChange(defintion: string) {
        this.setOutput(defintion);
    }

    public setOutput(definition: string) {
        this.definitions = mimicDefinitions(definition);
        const generators = mimicGenerators(this.definitions);
        const outputs = [];
        for (const genDef of generators.generatorDefs) {
            const output = `\nconst ${genDef.name} = `
                + JSON.stringify(genDef.generator(), null, 4) + ';';
            outputs.push(output);
        }
        const output = outputs.join('\n\n');
        this.output$.next(output);
        this.outputEditor.writeValue(output);
    }
}
