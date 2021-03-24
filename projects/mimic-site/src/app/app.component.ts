import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MimicLib, mimicDefinitions, mimicGenerators } from 'mimic';
import type { EditorOptions, NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import type * as m from 'monaco-editor';
import { BehaviorSubject } from 'rxjs';

declare const monaco: typeof m;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

    @ViewChild('outputEditor')
    private readonly outputEditor: NzCodeEditorComponent;

    // Sometimes is a special type that lets you specify the chance a value will be undefined
    public readonly code = `
// Mimic lets you generate mock data using TypeScript types
// On the right is sample output for what's defined below (try and edit it)

interface Name {
    firstName: asFirstName; // Use built in mock data generators. These start with "as", see auto complete for more
    lastName: asLastName;
}

interface Address {
    address; // Auto detect mock data
    secondaryAddress?: asSecondaryAddress; // Properties can be optional. These have a 50% chance of being undefined
    state?;
    city: \`City: \${asCity}\`; // Use template literals to define compound strings
}

interface BitcoinWallet {
    type: 'bitcoin'; // Use type literals for static data
    bitcoinAddress;
}

interface EtheriumWallet {
    type: 'etherium';
    etheriumAddress;
}

// Use type aliases to create convenient types (ex. union, array, literal types)
type DigitalWallet = BitcoinWallet | EtheriumWallet; // Union types for an equal chance at any of them

interface Person {
    name: Name; // Reference other defined types
    address: Address;
    digitalWallet?: DigitalWallet;
    age: asNumberRange<20, 30>; // Some mock data generators can take parameters to customize them.
    image?: Sometimes<.75, asImagePeople>; // Sometimes is a special type that lets you specify the chance a value will be defined
}

// Use type aliases to represent type literals
type Team = {
    members: BoundArray<Person, 6, 2>; // BoundArray is a special type that lets you specify the range of an array
};

// Use type aliases to represent top level array types
type People = Person[]; // Arrays have a random range of 0 to 10 elements

// Use tuples to represent more precise arrays
type Couple = [Person, Person];
`;

    public readonly editorOptions: EditorOptions = {
        language: 'typescript',
        theme: 'vs-dark',
    };

    public readonly output$ = new BehaviorSubject<string>('');

    public editorInit(_codeEditor: m.editor.IStandaloneCodeEditor): void {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(MimicLib.lib);
        setTimeout(() => this.setOutput(this.code));
    }

    public defintionChange(defintion: string) {
        this.setOutput(defintion);
    }

    public setOutput(definition: string) {
        const definitions = mimicDefinitions(definition);
        const generators = mimicGenerators(definitions);
        console.log('Mimic output', {
            definitions,
            generators,
        });
        const outputs = [];
        for (const genDef of generators.generatorDefs) {
            const output = `\nconst ${genDef.name} = `
                + JSON.stringify(genDef.generator(), null, 4) + ';';
            outputs.push(output);
        }
        const output = outputs.join('\n');
        this.output$.next(output);
        this.outputEditor.writeValue(output);
    }
}
