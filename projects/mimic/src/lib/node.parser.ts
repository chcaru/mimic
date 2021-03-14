import {
    SyntaxKind,
    InterfaceDeclaration,
    Node,
    PropertySignature,
    TypeAliasDeclaration,
} from 'typescript';

import {
    MimicDefinition,
    MimicDefinitionKind,
    MimicInterfaceDefinition,
    MimicProperty,
    MimicTypeDefinition,
} from './contracts';
import { getPropertyName } from './helper.parsers';
import { autoPrimary, parsePrimary } from './primary.parser';

const parseInterfaceDeclaration = (interfaceDeclaration: InterfaceDeclaration): MimicInterfaceDefinition => ({
    kind: MimicDefinitionKind.Interface,
    name: getPropertyName(interfaceDeclaration.name),
    properties: interfaceDeclaration.members.map((member: PropertySignature) => parsePropertySignature(member)),
});

const parsePropertySignature = (propertySignature: PropertySignature): MimicProperty => {
    const properties = propertySignature.type
        ? parsePrimary(propertySignature.type)
        : autoPrimary(propertySignature);
    return {
        name: getPropertyName(propertySignature.name),
        type: {
            ...properties,
            optional: !!propertySignature.questionToken,
        },
    };
};

const parseTypeAliasDeclaration = (typeAliasDeclaration: TypeAliasDeclaration): MimicTypeDefinition => ({
    kind: MimicDefinitionKind.Type,
    name: getPropertyName(typeAliasDeclaration.name),
    type: parsePrimary(typeAliasDeclaration.type),
});

const parsers = {
    [SyntaxKind.InterfaceDeclaration]: parseInterfaceDeclaration,
    [SyntaxKind.TypeAliasDeclaration]: parseTypeAliasDeclaration,
};

export const parseNode = (node: Node): MimicDefinition => {
    const parser = parsers[node.kind];
    return parser
        ? parser(node)
        : undefined;
};
