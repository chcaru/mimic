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
    MimicPrimary,
    MimicProperty,
    MimicPropertyDefintionReference,
    MimicPropertyKind,
    MimicPropertyLiteral,
    MimicPropertyPrimary,
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

const simpleParser = <T extends MimicPrimary>(primary: T) => (ref: TypeReferenceNode): Partial<MimicPropertyPrimary<T>> => ({
    kind: MimicPropertyKind.Primary,
    primary,
    args: getTypeArgsAsLiterals<T>(ref.typeArguments),
});

const mimicPrimaryParsers = {
    Sometimes: (ref: TypeReferenceNode): Partial<MimicProperty> => ({
        sometimes: getLiteralNumber(ref.typeArguments[0]),
        ...parsePrimary(ref.typeArguments[1] as TypeReferenceNode),
    }),
    BoundArray: (ref: TypeReferenceNode): Partial<MimicProperty> => ({
        kind: MimicPropertyKind.Array,
        max: getLiteralNumber(ref.typeArguments[1]) ?? 10,
        min: getLiteralNumber(ref.typeArguments[2]) ?? 0,
        element: parsePrimary(ref.typeArguments[0]),
    }),
    asZipCodeByState: simpleParser(MimicPrimary.asZipCodeByState),
    asZipCode: simpleParser(MimicPrimary.asZipCode),
    asCity: simpleParser(MimicPrimary.asCity),
    asCityPrefix: simpleParser(MimicPrimary.asCityPrefix),
    asCitySuffix: simpleParser(MimicPrimary.asCitySuffix),
    asStreetName: simpleParser(MimicPrimary.asStreetName),
    asStreetAddress: simpleParser(MimicPrimary.asStreetAddress),
    asStreetSuffix: simpleParser(MimicPrimary.asStreetSuffix),
    asStreetPrefix: simpleParser(MimicPrimary.asStreetPrefix),
    asSecondaryAddress: simpleParser(MimicPrimary.asSecondaryAddress),
    asCounty: simpleParser(MimicPrimary.asCounty),
    asCountry: simpleParser(MimicPrimary.asCountry),
    asCountryCode: simpleParser(MimicPrimary.asCountryCode),
    asState: simpleParser(MimicPrimary.asState),
    asStateAbbr: simpleParser(MimicPrimary.asStateAbbr),
    asLatitude: simpleParser(MimicPrimary.asLatitude),
    asLongitude: simpleParser(MimicPrimary.asLongitude),
    asDirection: simpleParser(MimicPrimary.asDirection),
    asCardinalDirection: simpleParser(MimicPrimary.asCardinalDirection),
    asOrdinalDirection: simpleParser(MimicPrimary.asOrdinalDirection),
    asNearbyGPSCoordinate: simpleParser(MimicPrimary.asNearbyGPSCoordinate),
    asTimeZone: simpleParser(MimicPrimary.asTimeZone),
    asCommerceColor: simpleParser(MimicPrimary.asCommerceColor),
    asDepartment: simpleParser(MimicPrimary.asDepartment),
    asProductName: simpleParser(MimicPrimary.asProductName),
    asPrice: simpleParser(MimicPrimary.asPrice),
    asProductAdjective: simpleParser(MimicPrimary.asProductAdjective),
    asProductMaterial: simpleParser(MimicPrimary.asProductMaterial),
    asProduct: simpleParser(MimicPrimary.asProduct),
    asProductDescription: simpleParser(MimicPrimary.asProductDescription),
    asCompanyName: simpleParser(MimicPrimary.asCompanyName),
    asCompanySuffix: simpleParser(MimicPrimary.asCompanySuffix),
    asCompanyCatchPhrase: simpleParser(MimicPrimary.asCompanyCatchPhrase),
    asCatchPhraseAdjective: simpleParser(MimicPrimary.asCatchPhraseAdjective),
    asCatchPhraseDescriptor: simpleParser(MimicPrimary.asCatchPhraseDescriptor),
    asCatchPhraseNoun: simpleParser(MimicPrimary.asCatchPhraseNoun),
    asDatabaseColumn: simpleParser(MimicPrimary.asDatabaseColumn),
    asDatabaseType: simpleParser(MimicPrimary.asDatabaseType),
    asDatabaseCollation: simpleParser(MimicPrimary.asDatabaseCollation),
    asDatabaseEngine: simpleParser(MimicPrimary.asDatabaseEngine),
    asDatePast: simpleParser(MimicPrimary.asDatePast),
    asDateFuture: simpleParser(MimicPrimary.asDateFuture),
    asDateBetween: simpleParser(MimicPrimary.asDateBetween),
    asDateRecent: simpleParser(MimicPrimary.asDateRecent),
    asDateSoon: simpleParser(MimicPrimary.asDateSoon),
    asMonth: simpleParser(MimicPrimary.asMonth),
    asWeekday: simpleParser(MimicPrimary.asWeekday),
    asFinanceAccount: simpleParser(MimicPrimary.asFinanceAccount),
    asFinanceAccountName: simpleParser(MimicPrimary.asFinanceAccountName),
    asRoutingNumber: simpleParser(MimicPrimary.asRoutingNumber),
    asCurrencyAmount: simpleParser(MimicPrimary.asCurrencyAmount),
    asFinanceTransactionType: simpleParser(MimicPrimary.asFinanceTransactionType),
    asCurrencyCode: simpleParser(MimicPrimary.asCurrencyCode),
    asCurrencyName: simpleParser(MimicPrimary.asCurrencyName),
    asCurrencySymbol: simpleParser(MimicPrimary.asCurrencySymbol),
    asBitcoinAddress: simpleParser(MimicPrimary.asBitcoinAddress),
    asCreditCardNumber: simpleParser(MimicPrimary.asCreditCardNumber),
    asCreditCardCVV: simpleParser(MimicPrimary.asCreditCardCVV),
    asEthereumAddress: simpleParser(MimicPrimary.asEthereumAddress),
    asFinanceTransactionDescription: simpleParser(MimicPrimary.asFinanceTransactionDescription),
    asGitBranch: simpleParser(MimicPrimary.asGitBranch),
    asGitCommitEntry: simpleParser(MimicPrimary.asGitCommitEntry),
    asGitCommitMessage: simpleParser(MimicPrimary.asGitCommitMessage),
    asGitCommitSha: simpleParser(MimicPrimary.asGitCommitSha),
    asGitShortSha: simpleParser(MimicPrimary.asGitShortSha),
    asHackerAbbreviation: simpleParser(MimicPrimary.asHackerAbbreviation),
    asHackerAdjective: simpleParser(MimicPrimary.asHackerAdjective),
    asHackerNoun: simpleParser(MimicPrimary.asHackerNoun),
    asHackerVerb: simpleParser(MimicPrimary.asHackerVerb),
    asHackingVerb: simpleParser(MimicPrimary.asHackingVerb),
    asHackerPhrase: simpleParser(MimicPrimary.asHackerPhrase),
    asImage: simpleParser(MimicPrimary.asImage),
    asAvatar: simpleParser(MimicPrimary.asAvatar),
    asImageUrl: simpleParser(MimicPrimary.asImageUrl),
    asImageAbstract: simpleParser(MimicPrimary.asImageAbstract),
    asImageAnimal: simpleParser(MimicPrimary.asImageAnimal),
    asImageBusiness: simpleParser(MimicPrimary.asImageBusiness),
    asImageCats: simpleParser(MimicPrimary.asImageCats),
    asImageCity: simpleParser(MimicPrimary.asImageCity),
    asImageFood: simpleParser(MimicPrimary.asImageFood),
    asImageNightlife: simpleParser(MimicPrimary.asImageNightlife),
    asImageFashion: simpleParser(MimicPrimary.asImageFashion),
    asImagePeople: simpleParser(MimicPrimary.asImagePeople),
    asImageNature: simpleParser(MimicPrimary.asImageNature),
    asImageSports: simpleParser(MimicPrimary.asImageSports),
    asImageTechnics: simpleParser(MimicPrimary.asImageTechnics),
    asImageTransport: simpleParser(MimicPrimary.asImageTransport),
    asImageDataUri: simpleParser(MimicPrimary.asImageDataUri),
    asInternetAvatar: simpleParser(MimicPrimary.asInternetAvatar),
    asEmail: simpleParser(MimicPrimary.asEmail),
    asExampleEmail: simpleParser(MimicPrimary.asExampleEmail),
    asUserName: simpleParser(MimicPrimary.asUserName),
    asProtocol: simpleParser(MimicPrimary.asProtocol),
    asUrl: simpleParser(MimicPrimary.asUrl),
    asDomainName: simpleParser(MimicPrimary.asDomainName),
    asDomainSuffix: simpleParser(MimicPrimary.asDomainSuffix),
    asDomainWord: simpleParser(MimicPrimary.asDomainWord),
    asIP: simpleParser(MimicPrimary.asIP),
    asIPv6: simpleParser(MimicPrimary.asIPv6),
    asUserAgent: simpleParser(MimicPrimary.asUserAgent),
    asRGB: simpleParser(MimicPrimary.asRGB),
    asMAC: simpleParser(MimicPrimary.asMAC),
    asPassword: simpleParser(MimicPrimary.asPassword),
    asLoremWord: simpleParser(MimicPrimary.asLoremWord),
    asLoremWords: simpleParser(MimicPrimary.asLoremWords),
    asLoremSentence: simpleParser(MimicPrimary.asLoremSentence),
    asLoremSlug: simpleParser(MimicPrimary.asLoremSlug),
    asLoremSentences: simpleParser(MimicPrimary.asLoremSentences),
    asLoremParagraph: simpleParser(MimicPrimary.asLoremParagraph),
    asLoremParagraphs: simpleParser(MimicPrimary.asLoremParagraphs),
    asLoremText: simpleParser(MimicPrimary.asLoremText),
    asLoremLines: simpleParser(MimicPrimary.asLoremLines),
    asFirstName: (ref: TypeReferenceNode): Partial<MimicPropertyPrimary<MimicPrimary.asFirstName>> => ({
        kind: MimicPropertyKind.Primary,
        primary: MimicPrimary.asFirstName,
        args: ref.typeArguments
            ? [getLiteralString(ref.typeArguments[0]).startsWith('m') ? 0 : 1]
            : [],
    }),
    asLastName: (ref: TypeReferenceNode): Partial<MimicPropertyPrimary<MimicPrimary.asLastName>> => ({
        kind: MimicPropertyKind.Primary,
        primary: MimicPrimary.asLastName,
        args: ref.typeArguments
            ? [getLiteralString(ref.typeArguments[0]).startsWith('m') ? 0 : 1]
            : [],
    }),
    asMiddleName: simpleParser(MimicPrimary.asMiddleName),
    asJobTitle: simpleParser(MimicPrimary.asJobTitle),
    asGender: simpleParser(MimicPrimary.asGender),
    asPrefix: simpleParser(MimicPrimary.asPrefix),
    asSuffix: simpleParser(MimicPrimary.asSuffix),
    asTitle: simpleParser(MimicPrimary.asTitle),
    asJobDescriptor: simpleParser(MimicPrimary.asJobDescriptor),
    asJobArea: simpleParser(MimicPrimary.asJobArea),
    asJobType: simpleParser(MimicPrimary.asJobType),
    asGenre: simpleParser(MimicPrimary.asGenre),
    asPhoneNumber: simpleParser(MimicPrimary.asPhoneNumber),
    asPhoneNumberFormat: simpleParser(MimicPrimary.asPhoneNumberFormat),
    asPhoneFormats: simpleParser(MimicPrimary.asPhoneFormats),
    asNumber: simpleParser(MimicPrimary.asNumber),
    asNumberRange: simpleParser(MimicPrimary.asNumberRange),
    asFloat: simpleParser(MimicPrimary.asFloat),
    asFloatRange: simpleParser(MimicPrimary.asFloatRange),
    asArrayElement: simpleParser(MimicPrimary.asArrayElement),
    asUUID: simpleParser(MimicPrimary.asUUID),
    asBoolean: simpleParser(MimicPrimary.asBoolean),
    asWord: simpleParser(MimicPrimary.asWord),
    asWords: simpleParser(MimicPrimary.asWords),
    asLocale: simpleParser(MimicPrimary.asLocale),
    asAlpha: simpleParser(MimicPrimary.asAlpha),
    asAlphaNumeric: simpleParser(MimicPrimary.asAlphaNumeric),
    asHexaDecimal: simpleParser(MimicPrimary.asHexaDecimal),
    asFileName: simpleParser(MimicPrimary.asFileName),
    asCommonFileName: simpleParser(MimicPrimary.asCommonFileName),
    asMimeType: simpleParser(MimicPrimary.asMimeType),
    asCommonFileType: simpleParser(MimicPrimary.asCommonFileType),
    asCommonFileExt: simpleParser(MimicPrimary.asCommonFileExt),
    asFileType: simpleParser(MimicPrimary.asFileType),
    asFileExt: simpleParser(MimicPrimary.asFileExt),
    asDirectoryPath: simpleParser(MimicPrimary.asDirectoryPath),
    asFilePath: simpleParser(MimicPrimary.asFilePath),
    asSemVer: simpleParser(MimicPrimary.asSemVer),
    asUnixTime: simpleParser(MimicPrimary.asUnixTime),
    asTime: simpleParser(MimicPrimary.asTime),
    asVehicle: simpleParser(MimicPrimary.asVehicle),
    asVehicleManufacturer: simpleParser(MimicPrimary.asVehicleManufacturer),
    asVehicleModel: simpleParser(MimicPrimary.asVehicleModel),
    asVehicleType: simpleParser(MimicPrimary.asVehicleType),
    asVehicleFuel: simpleParser(MimicPrimary.asVehicleFuel),
    asVehicleVIN: simpleParser(MimicPrimary.asVehicleVIN),
    asVehicleColor: simpleParser(MimicPrimary.asVehicleColor),
};

const primaries = Object.keys(mimicPrimaryParsers).filter(key => key.startsWith('as'));
const tryDetectPrimary = (name: string) => findBestMatch(name, primaries).bestMatch.target;
export const autoPrimary = (node: Node) => {
    // TODO: include name of interface / type for more context?
    const propertySignature = findNearestParentOfKind(node, SyntaxKind.PropertySignature) as PropertySignature;
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
                kind: MimicPropertyKind.DefinitionReference,
                definition: name,
            } as MimicPropertyDefintionReference;
    },
    [SyntaxKind.LiteralType]: (node: Node) => {
        const value = tryGetLiteralValue(node);
        return {
            kind: MimicPropertyKind.Literal,
            value,
        } as MimicPropertyLiteral;
    },
    [SyntaxKind.UnionType]: (node: Node) => ({
        kind: MimicPropertyKind.Union,
        types: (node as UnionTypeNode).types.map(parsePrimary),
    }),
    [SyntaxKind.ArrayType]: (node: Node) => {
        const elementType = (node as ArrayTypeNode).elementType;
        return {
            kind: MimicPropertyKind.Array,
            max: 10,
            min: 0,
            value: parsePrimary(elementType),
        };
    },
    [SyntaxKind.ParenthesizedType]: (node: Node) => parsePrimary((node as ParenthesizedTypeNode).type),
    [SyntaxKind.StringKeyword]: autoPrimary,
    [SyntaxKind.NumberKeyword]: autoPrimary,
};

export const parsePrimary = (node: Node) => {
    const primaryNodeParser = primaryParsers[node.kind];
    return primaryNodeParser
        ? primaryNodeParser(node)
        : undefined;
};
