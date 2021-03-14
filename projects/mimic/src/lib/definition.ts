import {
    CompilerHost,
    CompilerOptions,
    createProgram,
    createSourceFile,
    InterfaceDeclaration,
    ScriptTarget,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration,
} from 'typescript';

import { getPropertyName } from './helper.parsers';
import { lib } from './lib';
import { parseNode } from './node.parser';
import { isBuiltInType } from './primary.parser';

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

const topLevelDefinition = new Set([
    SyntaxKind.InterfaceDeclaration,
    SyntaxKind.TypeAliasDeclaration,
]);

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
        .filter(node =>
            topLevelDefinition.has(node.kind)
            && !isBuiltInType(
                getPropertyName(
                    (node as InterfaceDeclaration | TypeAliasDeclaration).name,
                ),
            ),
        )
        .map(node => parseNode(node));
};
