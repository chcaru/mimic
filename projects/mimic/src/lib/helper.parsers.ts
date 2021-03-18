import {
    SyntaxKind,
    Node,
    PropertyName,
    TypeNode,
    LiteralTypeNode,
} from 'typescript';
import {
    MimicPrimaryArgs,
} from './contracts';

export const getLiteralBoolean = (node: Node) => node
    ? (node as any)?.literal?.kind === SyntaxKind.TrueKeyword
        ? true
        : (node as any)?.literal?.kind === SyntaxKind.FalseKeyword
            ? false
            : undefined
    : undefined;

export const getLiteralString = (type: Node) => type
    ? (type as any)?.literal?.text as string
    : undefined;

export const getLiteralNumber = (node: Node) => {
    if (node) {
        const number = +getLiteralString(node);
        if (Number.isNaN(number)) {
            return undefined;
        }
        return number;
    }
    return undefined;
};

export const tryGetLiteralValue = (node: Node) => {
    if (node.kind === SyntaxKind.LiteralType) {
        const literal = (node as LiteralTypeNode).literal;
        switch (literal.kind) {
            case SyntaxKind.TrueKeyword: return true;
            case SyntaxKind.FalseKeyword: return false;
            case SyntaxKind.NullKeyword: return null;
            case SyntaxKind.StringLiteral: return literal.text;
            case SyntaxKind.FirstLiteralToken:
                const numberLiteral = +literal.text;
                return Number.isNaN(numberLiteral)
                    ? undefined
                    : numberLiteral;
        }
    }
    return undefined;
};

export const getTypeName = (node: Node) => (node as any)?.typeName?.escapedText as string;

export const getPropertyName = (node: PropertyName) =>
    node.kind === SyntaxKind.Identifier
        ? node.escapedText as string
        : undefined;

export const getTypeArgsAsLiterals = (
    args: readonly TypeNode[] | undefined,
    ...indices: number[]
): MimicPrimaryArgs => args
    ? indices.length
        ? indices.map(index => tryGetLiteralValue(args[index]))
        : args.map(arg => tryGetLiteralValue(arg))
    : [] as MimicPrimaryArgs;

export const findNearestParentOfKind = <T extends Node>(node: Node, kind: SyntaxKind): T => {
    while (node && node.kind !== kind) {
        node = node.parent;
    }
    return node as T;
};
