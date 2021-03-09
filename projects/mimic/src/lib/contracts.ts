
import { States } from './lib';

export type MimicGenerator = () => any;

export const enum MimicPropertyKind {
    DefinitionReference,
    Primary,
    Array,
    Literal,
    Union,
}

export interface MimicPropertyBase {
    name: string;
    kind: MimicPropertyKind;
    optional?: boolean;
    sometimes?: number;
}

export interface MimicPropertyDefintionReference extends MimicPropertyBase {
    kind: MimicPropertyKind.DefinitionReference;
    definition: string;
}

export interface MimicPropertyLiteral extends MimicPropertyBase {
    kind: MimicPropertyKind.Literal;
    value: string | number | boolean;
}

export interface MimicPropertyUnion extends MimicPropertyBase {
    kind: MimicPropertyKind.Union;
    types: AnonymousMimicProperty[];
}

export type MimicPrimaryArgs<T extends MimicPrimary> =
    T extends MimicPrimary.BoundArray ? [type: string, max: number, min: number]
    : T extends MimicPrimary.Sometimes ? [propability: number, type: string]
    : T extends MimicPrimary.asZipCodeByState ? [state: States]
    : T extends MimicPrimary.asState ? [useAbbr?: boolean]
    : T extends MimicPrimary.asStreetAddress ? [useFullAddress?: boolean]
    : T extends MimicPrimary.asLatitude ? [max?: number, min?: number]
    : T extends MimicPrimary.asLongitude ? [max?: number, min?: number]
    : T extends MimicPrimary.asFirstName ? [gender?: number]
    : T extends MimicPrimary.asLastName ? [gender?: number]
    : any[];

export interface MimicPropertyPrimary<T extends MimicPrimary = MimicPrimary> extends MimicPropertyBase {
    kind: MimicPropertyKind.Primary;
    primary: T;
    args?: MimicPrimaryArgs<T>;
}

export interface MimicPropertyArray extends MimicPropertyBase {
    kind: MimicPropertyKind.Array;
    element: AnonymousMimicProperty;
    min: number;
    max: number;
}

export type MimicProperty =
    MimicPropertyDefintionReference
    | MimicPropertyPrimary
    | MimicPropertyArray
    | MimicPropertyLiteral
    | MimicPropertyUnion;

export type AnonymousMimicProperty = Omit<MimicProperty, 'name'>;

export interface MimicDefintion {
    name: string;
    members: MimicProperty[];
}

export const enum MimicPrimary {
    Sometimes,
    BoundArray,
    asZipCodeByState,
    asZipCode,
    asCity,
    asCityPrefix,
    asCitySuffix,
    asStreetName,
    asStreetAddress,
    asStreetSuffix,
    asStreetPrefix,
    asSecondaryAddress,
    asCounty,
    asCountry,
    asCountryCode,
    asState,
    asStateAbbr,
    asLatitude,
    asLongitude,
    asDirection,
    asCardinalDirection,
    asOrdinalDirection,
    asNearbyGPSCoordinate,
    asTimeZone,
    asCommerceColor,
    asDepartment,
    asProductName,
    asPrice,
    asProductAdjective,
    asProductMaterial,
    asProduct,
    asProductDescription,
    asCompanyName,
    asCompanySuffix,
    asCompanyCatchPhrase,
    asCatchPhraseAdjective,
    asCatchPhraseDescriptor,
    asCatchPhraseNoun,
    asDatabaseColumn,
    asDatabaseType,
    asDatabaseCollation,
    asDatabaseEngine,
    asDatePast,
    asDateFuture,
    asDateBetween,
    asDateRecent,
    asDateSoon,
    asMonth,
    asWeekday,
    asFinanceAccount,
    asFinanceAccountName,
    asRoutingNumber,
    asCurrencyAmount,
    asFinanceTransactionType,
    asCurrencyCode,
    asCurrencyName,
    asCurrencySymbol,
    asBitcoinAddress,
    asCreditCardNumber,
    asCreditCardCVV,
    asEthereumAddress,
    asFinanceTransactionDescription,
    asGitBranch,
    asGitCommitEntry,
    asGitCommitMessage,
    asGitCommitSha,
    asGitShortSha,
    asHackerAbbreviation,
    asHackerAdjective,
    asHackerNoun,
    asHackerVerb,
    asHackingVerb,
    asHackerPhrase,
    asImage,
    asAvatar,
    asImageUrl,
    asImageAbstract,
    asImageAnimal,
    asImageBusiness,
    asImageCats,
    asImageCity,
    asImageFood,
    asImageNightlife,
    asImageFashion,
    asImagePeople,
    asImageNature,
    asImageSports,
    asImageTechnics,
    asImageTransport,
    asImageDataUri,
    asInternetAvatar,
    asEmail,
    asExampleEmail,
    asUserName,
    asProtocol,
    asUrl,
    asDomainName,
    asDomainSuffix,
    asDomainWord,
    asIP,
    asIPv6,
    asUserAgent,
    asRGB,
    asMAC,
    asPassword,
    asLoremWord,
    asLoremWords,
    asLoremSentence,
    asLoremSlug,
    asLoremSentences,
    asLoremParagraph,
    asLoremParagraphs,
    asLoremText,
    asLoremLines,
    asFirstName,
    asLastName,
    asMiddleName,
    asJobTitle,
    asGender,
    asPrefix,
    asSuffix,
    asTitle,
    asJobDescriptor,
    asJobArea,
    asJobType,
    asGenre,
    asPhoneNumber,
    asPhoneNumberFormat,
    asPhoneFormats,
    asNumber,
    asNumberRange,
    asFloat,
    asFloatRange,
    asArrayElement,
    asUUID,
    asBoolean,
    asWord,
    asWords,
    asLocale,
    asAlpha,
    asAlphaNumeric,
    asHexaDecimal,
    asFileName,
    asCommonFileName,
    asMimeType,
    asCommonFileType,
    asCommonFileExt,
    asFileType,
    asFileExt,
    asDirectoryPath,
    asFilePath,
    asSemVer,
    asUnixTime,
    asTime,
    asVehicle,
    asVehicleManufacturer,
    asVehicleModel,
    asVehicleType,
    asVehicleFuel,
    asVehicleVIN,
    asVehicleColor,
}
