import {
    SyntaxKind,
    InterfaceDeclaration,
    Node,
    TypeAliasDeclaration,
} from 'typescript';

import {
    MimicDefinition,
    MimicDefinitionKind,
    MimicInterfaceDefinition,
    MimicTypeDefinition,
} from './contracts';
import { getPropertyName } from './helper.parsers';
import { parsePrimary } from './primary.parser';

const parsers = {
    [SyntaxKind.InterfaceDeclaration]: (interfaceDeclaration: InterfaceDeclaration): MimicInterfaceDefinition => ({
        kind: MimicDefinitionKind.Interface,
        name: getPropertyName(interfaceDeclaration.name),
        type: parsePrimary(interfaceDeclaration),
    }),
    [SyntaxKind.TypeAliasDeclaration]: (typeAliasDeclaration: TypeAliasDeclaration): MimicTypeDefinition => ({
        kind: MimicDefinitionKind.TypeAlias,
        name: getPropertyName(typeAliasDeclaration.name),
        type: parsePrimary(typeAliasDeclaration.type),
    }),
};

export const parseNode = (node: Node): MimicDefinition => {
    const parser = parsers[node.kind];
    return parser
        ? parser(node)
        : undefined;
};
