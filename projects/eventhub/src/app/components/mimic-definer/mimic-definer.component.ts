import { Component, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { EditorOptions, NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { BehaviorSubject } from 'rxjs';
import { mimicDefinitions, MimicDefintion, MimicGenerator, mimicGenerators, MimicLib } from 'mimic';
import type * as m from 'monaco-editor';

declare const monaco: typeof m;

let mimicInit = false;

@Component({
    selector: 'mimic-definer',
    templateUrl: './mimic-definer.component.html',
    styleUrls: ['./mimic-definer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MimicDefinerComponent {

    @Input()
    public codeDefinition: string;

    @Input()
    public showExample: boolean = true;

    @Output()
    public changeCodeDefinition = new EventEmitter<string>();

    @Output()
    public changeDefinition = new EventEmitter<MimicDefintion[]>();

    @Output()
    public changeGenerators = new EventEmitter<Record<string, MimicGenerator>>();

    @ViewChild('outputEditor')
    private readonly outputEditor?: NzCodeEditorComponent;

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

    public editorInit(): void {
        if (!mimicInit) {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(MimicLib.lib);
            mimicInit = true;
        }
        this.editorLoading = false;
        setTimeout(() => this.setOutput(this.codeDefinition));
    }

    public defintionChange(codeDefinition: string) {
        this.setOutput(codeDefinition);
    }

    public setOutput(codeDefinition: string) {
        this.changeCodeDefinition.next(codeDefinition);

        this.definitions = mimicDefinitions(codeDefinition);
        this.changeDefinition.next(this.definitions);

        const generators = mimicGenerators(this.definitions);
        this.changeGenerators.next(generators.generatorMap);

        if (this.showExample) {
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
}
