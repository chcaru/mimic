import {
    SyntaxKind,
    InterfaceDeclaration,
    Node,
    PropertySignature,
} from 'typescript';

import {
    MimicDefintion,
    MimicProperty,
} from './contracts';
import { getPropertyName } from './helper.parsers';
import { autoPrimary, parsePrimary } from './primary.parser';

const parseInterfaceDeclaration = (interfaceDeclaration: InterfaceDeclaration): MimicDefintion => {
    const name = getPropertyName(interfaceDeclaration.name);
    const members = interfaceDeclaration.members.map(member => parseNode(member));
    return {
        name,
        members,
    };
};

const parsePropertySignature = (propertySignature: PropertySignature): MimicProperty => {
    const name = getPropertyName(propertySignature.name);
    const properties = propertySignature.type
        ? parsePrimary(propertySignature.type)
        : autoPrimary(propertySignature);
    return {
        ...properties,
        name,
        optional: !!propertySignature.questionToken,
    };
};

const parsers = {
    [SyntaxKind.InterfaceDeclaration]: parseInterfaceDeclaration,
    [SyntaxKind.PropertySignature]: parsePropertySignature,
};

export const parseNode = (node: Node) => {
    const parser = parsers[node.kind];
    return parser
        ? parser(node)
        : undefined;
};
