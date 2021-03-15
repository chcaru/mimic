import {
    ArrayTypeNode,
    Node,
    ParenthesizedTypeNode,
    PropertySignature,
    SyntaxKind,
    TypeReferenceNode,
    UnionTypeNode,
} from 'typescript';
import { findBestMatch } from 'string-similarity';

import {
    MimicPrimaryKind,
    MimicType,
    MimicArray,
    MimicDefintionReference,
    MimicTypeKind,
    MimicLiteral,
    MimicPrimary,
    MimicUnion,
} from './contracts';
import {
    findNearestParentOfKind,
    getLiteralNumber,
    getLiteralString,
    getPropertyName,
    getTypeArgsAsLiterals,
    getTypeName,
    tryGetLiteralValue,
} from './helper.parsers';

const simpleParser = <T extends MimicPrimaryKind>(primary: T) => (ref: TypeReferenceNode): Partial<MimicPrimary<T>> => ({
    kind: MimicTypeKind.Primary,
    primary,
    args: getTypeArgsAsLiterals(ref.typeArguments),
});

const mimicPrimaryParsers = {
    States: true,
    Genders: true,
    Sometimes: (ref: TypeReferenceNode): Partial<MimicType> => ({
        sometimes: getLiteralNumber(ref.typeArguments[0]),
        ...parsePrimary(ref.typeArguments[1] as TypeReferenceNode),
    }),
    BoundArray: (ref: TypeReferenceNode): Partial<MimicType> => ({
        kind: MimicTypeKind.Array,
        max: getLiteralNumber(ref.typeArguments[1]) ?? 10,
        min: getLiteralNumber(ref.typeArguments[2]) ?? 0,
        element: parsePrimary(ref.typeArguments[0]),
    }),
    asZipCodeByState: simpleParser(MimicPrimaryKind.asZipCodeByState),
    asZipCode: simpleParser(MimicPrimaryKind.asZipCode),
    asCity: simpleParser(MimicPrimaryKind.asCity),
    asCityPrefix: simpleParser(MimicPrimaryKind.asCityPrefix),
    asCitySuffix: simpleParser(MimicPrimaryKind.asCitySuffix),
    asStreetName: simpleParser(MimicPrimaryKind.asStreetName),
    asStreetAddress: simpleParser(MimicPrimaryKind.asStreetAddress),
    asStreetSuffix: simpleParser(MimicPrimaryKind.asStreetSuffix),
    asStreetPrefix: simpleParser(MimicPrimaryKind.asStreetPrefix),
    asSecondaryAddress: simpleParser(MimicPrimaryKind.asSecondaryAddress),
    asCounty: simpleParser(MimicPrimaryKind.asCounty),
    asCountry: simpleParser(MimicPrimaryKind.asCountry),
    asCountryCode: simpleParser(MimicPrimaryKind.asCountryCode),
    asState: simpleParser(MimicPrimaryKind.asState),
    asStateAbbr: simpleParser(MimicPrimaryKind.asStateAbbr),
    asLatitude: simpleParser(MimicPrimaryKind.asLatitude),
    asLongitude: simpleParser(MimicPrimaryKind.asLongitude),
    asDirection: simpleParser(MimicPrimaryKind.asDirection),
    asCardinalDirection: simpleParser(MimicPrimaryKind.asCardinalDirection),
    asOrdinalDirection: simpleParser(MimicPrimaryKind.asOrdinalDirection),
    asNearbyGPSCoordinate: simpleParser(MimicPrimaryKind.asNearbyGPSCoordinate),
    asTimeZone: simpleParser(MimicPrimaryKind.asTimeZone),
    asCommerceColor: simpleParser(MimicPrimaryKind.asCommerceColor),
    asDepartment: simpleParser(MimicPrimaryKind.asDepartment),
    asProductName: simpleParser(MimicPrimaryKind.asProductName),
    asPrice: simpleParser(MimicPrimaryKind.asPrice),
    asProductAdjective: simpleParser(MimicPrimaryKind.asProductAdjective),
    asProductMaterial: simpleParser(MimicPrimaryKind.asProductMaterial),
    asProduct: simpleParser(MimicPrimaryKind.asProduct),
    asProductDescription: simpleParser(MimicPrimaryKind.asProductDescription),
    asCompanyName: simpleParser(MimicPrimaryKind.asCompanyName),
    asCompanySuffix: simpleParser(MimicPrimaryKind.asCompanySuffix),
    asCompanyCatchPhrase: simpleParser(MimicPrimaryKind.asCompanyCatchPhrase),
    asCatchPhraseAdjective: simpleParser(MimicPrimaryKind.asCatchPhraseAdjective),
    asCatchPhraseDescriptor: simpleParser(MimicPrimaryKind.asCatchPhraseDescriptor),
    asCatchPhraseNoun: simpleParser(MimicPrimaryKind.asCatchPhraseNoun),
    asDatabaseColumn: simpleParser(MimicPrimaryKind.asDatabaseColumn),
    asDatabaseType: simpleParser(MimicPrimaryKind.asDatabaseType),
    asDatabaseCollation: simpleParser(MimicPrimaryKind.asDatabaseCollation),
    asDatabaseEngine: simpleParser(MimicPrimaryKind.asDatabaseEngine),
    asDatePast: simpleParser(MimicPrimaryKind.asDatePast),
    asDateFuture: simpleParser(MimicPrimaryKind.asDateFuture),
    asDateBetween: simpleParser(MimicPrimaryKind.asDateBetween),
    asDateRecent: simpleParser(MimicPrimaryKind.asDateRecent),
    asDateSoon: simpleParser(MimicPrimaryKind.asDateSoon),
    asMonth: simpleParser(MimicPrimaryKind.asMonth),
    asWeekday: simpleParser(MimicPrimaryKind.asWeekday),
    asFinanceAccount: simpleParser(MimicPrimaryKind.asFinanceAccount),
    asFinanceAccountName: simpleParser(MimicPrimaryKind.asFinanceAccountName),
    asRoutingNumber: simpleParser(MimicPrimaryKind.asRoutingNumber),
    asCurrencyAmount: simpleParser(MimicPrimaryKind.asCurrencyAmount),
    asFinanceTransactionType: simpleParser(MimicPrimaryKind.asFinanceTransactionType),
    asCurrencyCode: simpleParser(MimicPrimaryKind.asCurrencyCode),
    asCurrencyName: simpleParser(MimicPrimaryKind.asCurrencyName),
    asCurrencySymbol: simpleParser(MimicPrimaryKind.asCurrencySymbol),
    asBitcoinAddress: simpleParser(MimicPrimaryKind.asBitcoinAddress),
    asCreditCardNumber: simpleParser(MimicPrimaryKind.asCreditCardNumber),
    asCreditCardCVV: simpleParser(MimicPrimaryKind.asCreditCardCVV),
    asEthereumAddress: simpleParser(MimicPrimaryKind.asEthereumAddress),
    asFinanceTransactionDescription: simpleParser(MimicPrimaryKind.asFinanceTransactionDescription),
    asGitBranch: simpleParser(MimicPrimaryKind.asGitBranch),
    asGitCommitEntry: simpleParser(MimicPrimaryKind.asGitCommitEntry),
    asGitCommitMessage: simpleParser(MimicPrimaryKind.asGitCommitMessage),
    asGitCommitSha: simpleParser(MimicPrimaryKind.asGitCommitSha),
    asGitShortSha: simpleParser(MimicPrimaryKind.asGitShortSha),
    asHackerAbbreviation: simpleParser(MimicPrimaryKind.asHackerAbbreviation),
    asHackerAdjective: simpleParser(MimicPrimaryKind.asHackerAdjective),
    asHackerNoun: simpleParser(MimicPrimaryKind.asHackerNoun),
    asHackerVerb: simpleParser(MimicPrimaryKind.asHackerVerb),
    asHackingVerb: simpleParser(MimicPrimaryKind.asHackingVerb),
    asHackerPhrase: simpleParser(MimicPrimaryKind.asHackerPhrase),
    asImage: simpleParser(MimicPrimaryKind.asImage),
    asAvatar: simpleParser(MimicPrimaryKind.asAvatar),
    asImageUrl: simpleParser(MimicPrimaryKind.asImageUrl),
    asImageAbstract: simpleParser(MimicPrimaryKind.asImageAbstract),
    asImageAnimal: simpleParser(MimicPrimaryKind.asImageAnimal),
    asImageBusiness: simpleParser(MimicPrimaryKind.asImageBusiness),
    asImageCats: simpleParser(MimicPrimaryKind.asImageCats),
    asImageCity: simpleParser(MimicPrimaryKind.asImageCity),
    asImageFood: simpleParser(MimicPrimaryKind.asImageFood),
    asImageNightlife: simpleParser(MimicPrimaryKind.asImageNightlife),
    asImageFashion: simpleParser(MimicPrimaryKind.asImageFashion),
    asImagePeople: simpleParser(MimicPrimaryKind.asImagePeople),
    asImageNature: simpleParser(MimicPrimaryKind.asImageNature),
    asImageSports: simpleParser(MimicPrimaryKind.asImageSports),
    asImageTechnics: simpleParser(MimicPrimaryKind.asImageTechnics),
    asImageTransport: simpleParser(MimicPrimaryKind.asImageTransport),
    asImageDataUri: simpleParser(MimicPrimaryKind.asImageDataUri),
    asInternetAvatar: simpleParser(MimicPrimaryKind.asInternetAvatar),
    asEmail: simpleParser(MimicPrimaryKind.asEmail),
    asExampleEmail: simpleParser(MimicPrimaryKind.asExampleEmail),
    asUserName: simpleParser(MimicPrimaryKind.asUserName),
    asProtocol: simpleParser(MimicPrimaryKind.asProtocol),
    asUrl: simpleParser(MimicPrimaryKind.asUrl),
    asDomainName: simpleParser(MimicPrimaryKind.asDomainName),
    asDomainSuffix: simpleParser(MimicPrimaryKind.asDomainSuffix),
    asDomainWord: simpleParser(MimicPrimaryKind.asDomainWord),
    asIP: simpleParser(MimicPrimaryKind.asIP),
    asIPv6: simpleParser(MimicPrimaryKind.asIPv6),
    asUserAgent: simpleParser(MimicPrimaryKind.asUserAgent),
    asRGB: simpleParser(MimicPrimaryKind.asRGB),
    asMAC: simpleParser(MimicPrimaryKind.asMAC),
    asPassword: simpleParser(MimicPrimaryKind.asPassword),
    asLoremWord: simpleParser(MimicPrimaryKind.asLoremWord),
    asLoremWords: simpleParser(MimicPrimaryKind.asLoremWords),
    asLoremSentence: simpleParser(MimicPrimaryKind.asLoremSentence),
    asLoremSlug: simpleParser(MimicPrimaryKind.asLoremSlug),
    asLoremSentences: simpleParser(MimicPrimaryKind.asLoremSentences),
    asLoremParagraph: simpleParser(MimicPrimaryKind.asLoremParagraph),
    asLoremParagraphs: simpleParser(MimicPrimaryKind.asLoremParagraphs),
    asLoremText: simpleParser(MimicPrimaryKind.asLoremText),
    asLoremLines: simpleParser(MimicPrimaryKind.asLoremLines),
    asFirstName: (ref: TypeReferenceNode): Partial<MimicPrimary<MimicPrimaryKind.asFirstName>> => ({
        kind: MimicTypeKind.Primary,
        primary: MimicPrimaryKind.asFirstName,
        args: ref.typeArguments
            ? [getLiteralString(ref.typeArguments[0]).startsWith('m') ? 0 : 1]
            : [],
    }),
    asLastName: (ref: TypeReferenceNode): Partial<MimicPrimary<MimicPrimaryKind.asLastName>> => ({
        kind: MimicTypeKind.Primary,
        primary: MimicPrimaryKind.asLastName,
        args: ref.typeArguments
            ? [getLiteralString(ref.typeArguments[0]).startsWith('m') ? 0 : 1]
            : [],
    }),
    asMiddleName: simpleParser(MimicPrimaryKind.asMiddleName),
    asJobTitle: simpleParser(MimicPrimaryKind.asJobTitle),
    asGender: simpleParser(MimicPrimaryKind.asGender),
    asPrefix: simpleParser(MimicPrimaryKind.asPrefix),
    asSuffix: simpleParser(MimicPrimaryKind.asSuffix),
    asTitle: simpleParser(MimicPrimaryKind.asTitle),
    asJobDescriptor: simpleParser(MimicPrimaryKind.asJobDescriptor),
    asJobArea: simpleParser(MimicPrimaryKind.asJobArea),
    asJobType: simpleParser(MimicPrimaryKind.asJobType),
    asGenre: simpleParser(MimicPrimaryKind.asGenre),
    asPhoneNumber: simpleParser(MimicPrimaryKind.asPhoneNumber),
    asPhoneNumberFormat: simpleParser(MimicPrimaryKind.asPhoneNumberFormat),
    asPhoneFormats: simpleParser(MimicPrimaryKind.asPhoneFormats),
    asNumber: simpleParser(MimicPrimaryKind.asNumber),
    asNumberRange: simpleParser(MimicPrimaryKind.asNumberRange),
    asFloat: simpleParser(MimicPrimaryKind.asFloat),
    asFloatRange: simpleParser(MimicPrimaryKind.asFloatRange),
    asArrayElement: simpleParser(MimicPrimaryKind.asArrayElement),
    asUUID: simpleParser(MimicPrimaryKind.asUUID),
    asBoolean: simpleParser(MimicPrimaryKind.asBoolean),
    asWord: simpleParser(MimicPrimaryKind.asWord),
    asWords: simpleParser(MimicPrimaryKind.asWords),
    asLocale: simpleParser(MimicPrimaryKind.asLocale),
    asAlpha: simpleParser(MimicPrimaryKind.asAlpha),
    asAlphaNumeric: simpleParser(MimicPrimaryKind.asAlphaNumeric),
    asHexaDecimal: simpleParser(MimicPrimaryKind.asHexaDecimal),
    asFileName: simpleParser(MimicPrimaryKind.asFileName),
    asCommonFileName: simpleParser(MimicPrimaryKind.asCommonFileName),
    asMimeType: simpleParser(MimicPrimaryKind.asMimeType),
    asCommonFileType: simpleParser(MimicPrimaryKind.asCommonFileType),
    asCommonFileExt: simpleParser(MimicPrimaryKind.asCommonFileExt),
    asFileType: simpleParser(MimicPrimaryKind.asFileType),
    asFileExt: simpleParser(MimicPrimaryKind.asFileExt),
    asDirectoryPath: simpleParser(MimicPrimaryKind.asDirectoryPath),
    asFilePath: simpleParser(MimicPrimaryKind.asFilePath),
    asSemVer: simpleParser(MimicPrimaryKind.asSemVer),
    asUnixTime: simpleParser(MimicPrimaryKind.asUnixTime),
    asTime: simpleParser(MimicPrimaryKind.asTime),
    asVehicle: simpleParser(MimicPrimaryKind.asVehicle),
    asVehicleManufacturer: simpleParser(MimicPrimaryKind.asVehicleManufacturer),
    asVehicleModel: simpleParser(MimicPrimaryKind.asVehicleModel),
    asVehicleType: simpleParser(MimicPrimaryKind.asVehicleType),
    asVehicleFuel: simpleParser(MimicPrimaryKind.asVehicleFuel),
    asVehicleVIN: simpleParser(MimicPrimaryKind.asVehicleVIN),
    asVehicleColor: simpleParser(MimicPrimaryKind.asVehicleColor),
};

export const isBuiltInType = (name: string) => !!mimicPrimaryParsers[name];

const primaries = Object
    .keys(mimicPrimaryParsers)
    .filter(key => key.startsWith('as'));
const primaryNames = primaries.map(primary => primary.substr(2).toLowerCase());
const tryDetectPrimary = (name: string) => primaries[findBestMatch(name, primaryNames).bestMatchIndex];
export const autoPrimary = (node: Node) => {
    // TODO: include name of interface / type for more context?
    const propertySignature = findNearestParentOfKind<PropertySignature>(node, SyntaxKind.PropertySignature);
    if (propertySignature) {
        const name = getPropertyName(propertySignature.name);
        const detectedPrimary = tryDetectPrimary(name);
        const parser = mimicPrimaryParsers[detectedPrimary];
        return parser(node);
    }
};

const primaryParsers = {
    [SyntaxKind.TypeReference]: (node: Node) => {
        const name = getTypeName(node);
        const parser = mimicPrimaryParsers[name];
        return parser
            ? parser(node)
            : {
                // Assume if a primary doesn't exist, then it's a definition reference
                kind: MimicTypeKind.DefinitionReference,
                definition: name,
            } as MimicDefintionReference;
    },
    [SyntaxKind.LiteralType]: (node: Node): Partial<MimicLiteral> => ({
        kind: MimicTypeKind.Literal,
        value: tryGetLiteralValue(node),
    }),
    [SyntaxKind.UnionType]: (node: UnionTypeNode): Partial<MimicUnion> => ({
        kind: MimicTypeKind.Union,
        types: node.types.map(parsePrimary),
    }),
    [SyntaxKind.ArrayType]: (node: ArrayTypeNode): Partial<MimicArray> => ({
        kind: MimicTypeKind.Array,
        max: 10,
        min: 0,
        element: parsePrimary(node.elementType),
    }),
    [SyntaxKind.ParenthesizedType]: (node: ParenthesizedTypeNode) => parsePrimary(node.type),
    [SyntaxKind.StringKeyword]: autoPrimary,
    [SyntaxKind.NumberKeyword]: autoPrimary,
};

export const parsePrimary = (node: Node) => {
    const primaryNodeParser = primaryParsers[node.kind];
    return primaryNodeParser
        ? primaryNodeParser(node)
        : undefined;
};
