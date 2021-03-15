
export type MimicGenerator = () => any;

export const enum MimicTypeKind {
    DefinitionReference,
    Primary,
    Array,
    Literal,
    Union,
    TemplateLiteral,
}

export interface MimicTypeBase {
    kind: MimicTypeKind;
    optional?: boolean;
    sometimes?: number;
}

export interface MimicDefintionReference extends MimicTypeBase {
    kind: MimicTypeKind.DefinitionReference;
    definition: string;
}

export type MimicPrimaryArgs = unknown[];

export interface MimicPrimary<T extends MimicPrimaryKind = MimicPrimaryKind> extends MimicTypeBase {
    kind: MimicTypeKind.Primary;
    primary: T;
    args?: MimicPrimaryArgs;
}

export interface MimicArray extends MimicTypeBase {
    kind: MimicTypeKind.Array;
    element: MimicType;
    min: number;
    max: number;
}

export interface MimicLiteral extends MimicTypeBase {
    kind: MimicTypeKind.Literal;
    value: string | number | boolean;
}

export interface MimicUnion extends MimicTypeBase {
    kind: MimicTypeKind.Union;
    types: MimicType[];
}

export const enum MimicTemplateLiteralPartKind {
    StringLiteral,
    Type,
}

export interface MimicTemplateLiteralStringLiteralPart {
    kind: MimicTemplateLiteralPartKind.StringLiteral;
    text: string;
}

export interface MimicTemplateLiteralTypePart {
    kind: MimicTemplateLiteralPartKind.Type;
    type: MimicType;
}

export type MimicTemplateLiteralPart = MimicTemplateLiteralStringLiteralPart | MimicTemplateLiteralTypePart;

export interface MimicTemplateLiteral extends MimicTypeBase {
    kind: MimicTypeKind.TemplateLiteral;
    parts: MimicTemplateLiteralPart[];
}

export type MimicType =
    MimicDefintionReference
    | MimicPrimary
    | MimicArray
    | MimicLiteral
    | MimicUnion
    | MimicTemplateLiteral;

export interface MimicProperty {
    name: string;
    type: MimicType;
}

export const enum MimicDefinitionKind {
    Interface,
    TypeAlias,
}

export interface MimicDefinitionBase<TKind extends MimicDefinitionKind> {
    name: string;
    kind: TKind;
}

export interface MimicInterfaceDefinition extends MimicDefinitionBase<MimicDefinitionKind.Interface> {
    properties: MimicProperty[];
}

export interface MimicTypeDefinition extends MimicDefinitionBase<MimicDefinitionKind.TypeAlias> {
    type: MimicType;
}

export type MimicDefinition = MimicInterfaceDefinition | MimicTypeDefinition;

export const enum MimicPrimaryKind {
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
