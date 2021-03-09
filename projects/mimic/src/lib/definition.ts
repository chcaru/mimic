import {
    CompilerHost,
    CompilerOptions,
    createProgram,
    createSourceFile,
    ScriptTarget,
    SourceFile,
    SyntaxKind,
} from 'typescript';

import { MimicDefintion } from './contracts';
import { lib } from './lib';
import { parseNode } from './node.parser';

const definitionFileName = 'defintion.ts';

class MimicCompilerHost implements CompilerHost {
    constructor(
        private readonly code: string,
    ) { }

    fileExists = () => true;
    getCanonicalFileName = () => definitionFileName;
    getCurrentDirectory = () => '';
    getDefaultLibFileName = () => 'lib.d.ts';
    getDirectories = () => [];
    getNewLine = () => '\n';
    readFile = () => null;
    useCaseSensitiveFileNames = () => true;
    writeFile = () => {};
    getSourceFile(fileName: string): SourceFile {
        switch (fileName) {
            case definitionFileName: return createSourceFile(fileName, lib + this.code, ScriptTarget.ES5, true);
        }
    }
}

export const getDefinitions = (tsCodeDefinition: string) => {
    const config: CompilerOptions = {
        noResolve: true,
        target: ScriptTarget.ES5,
    };
    const program = createProgram([definitionFileName], config, new MimicCompilerHost(tsCodeDefinition));
    const ast = program.getSourceFile(definitionFileName);

    return ast
        .getChildAt(0)
        .getChildren()
        .filter(child => child.kind === SyntaxKind.InterfaceDeclaration)
        .map(node => parseNode(node) as MimicDefintion);
};
