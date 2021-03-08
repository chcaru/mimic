import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MimicLib, mimic } from 'mimic';
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

    public readonly code = `
interface Team {
    members: BoundArray<Person, 6, 2>;
}

interface Person {
    name: Name;
    address: asStreetAddress;
}

interface Name {
    firstName: asFirstName;
    lastName: asLastName;
    middleName?: Sometimes<.5, asMiddleName>;
}
`;

    public readonly editorOptions: EditorOptions = {
        language: 'typescript',
        theme: 'vs-dark',
    };

    public readonly output$ = new BehaviorSubject<string>('');

    public editorInit(_codeEditor: m.editor.IStandaloneCodeEditor): void {
        console.log(_codeEditor);
        console.log(MimicLib.lib);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(MimicLib.lib);
        setTimeout(() => this.setOutput(this.code));
    }

    public defintionChange(defintion: string) {
        this.setOutput(defintion);
    }

    public setOutput(definition: string) {
        const generators = mimic(definition);
        const outputs = [];
        for (const genDef of generators.generatorDefs) {
            const output = `const ${genDef.name} = `
                + JSON.stringify(genDef.generator(), null, 4) + ';';
            outputs.push(output);
        }
        const output = outputs.join('\n\n');
        this.output$.next(output);
        this.outputEditor.writeValue(output);
    }
}
