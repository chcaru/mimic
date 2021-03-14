import {
    SyntaxKind,
    Node,
    PropertyName,
    TypeNode,
} from 'typescript';
import {
    MimicPrimary,
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
    const text = getLiteralString(node);
    const number = getLiteralNumber(node);
    const bool = getLiteralBoolean(node);
    const value = bool ?? (number == null ? text : number);
    return value;
};

export const getTypeName = (node: Node) => (node as any)?.typeName?.escapedText as string;

export const getPropertyName = (node: PropertyName) =>
    node.kind === SyntaxKind.Identifier
        ? node.escapedText as string
        : undefined;

export const getTypeArgsAsLiterals = <T extends MimicPrimary = MimicPrimary>(
    args: readonly TypeNode[] | undefined, ...indices: number[]
): MimicPrimaryArgs<T> => args
    ? indices.length
        ? indices.map(index => tryGetLiteralValue(args[index])) as MimicPrimaryArgs<T>
        : args.map(arg => tryGetLiteralValue(arg)) as MimicPrimaryArgs<T>
    : [] as any[] as MimicPrimaryArgs<T>;

export const findNearestParentOfKind = <T extends Node>(node: Node, kind: SyntaxKind): T => {
    while (node && node.kind !== kind) {
        node = node.parent;
    }
    return node as T;
};
