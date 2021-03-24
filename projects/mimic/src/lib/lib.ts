
export type Sometimes<Chance extends number, T> = T | undefined;
export type BoundArray<T, Max extends number, Min extends number = 0> = T[];

export type States = 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';
export type asZipCodeByState<State extends States> = string;
export type asZipCode = string;
export type asCity = string;
export type asCityPrefix = string;
export type asCitySuffix = string;
export type asStreetName = string;
export type asStreetAddress<UseFullAddress extends boolean = false> = string;
export type asStreetSuffix = string;
export type asStreetPrefix = string;
export type asSecondaryAddress = string;
export type asCounty = string;
export type asCountry = string;
export type asCountryCode = string;
export type asState<UseAbbr extends boolean = false> = string;
export type asStateAbbr = string;
export type asLatitude<Max extends number = number, Min extends number = number> = string;
export type asLongitude<Max extends number = number, Min extends number = number> = string;
export type asDirection = string;
export type asCardinalDirection = string;
export type asOrdinalDirection = string;
export type asNearbyGPSCoordinate = string[];
export type asTimeZone = string;

export type asCommerceColor = string;
export type asDepartment = string;
export type asProductName = string;
export type asPrice<Min extends number = number, Max extends number = number, Dec extends number = number, Symbol extends string = string> = string;
export type asProductAdjective = string;
export type asProductMaterial = string;
export type asProduct = string;
export type asProductDescription = string;

// export- type asSuffixes = string[];
export type asCompanyName<Format extends string = string> = string;
export type asCompanySuffix = string;
export type asCompanyCatchPhrase = string;
// export- type asCompanyBS = string;
export type asCatchPhraseAdjective = string;
export type asCatchPhraseDescriptor = string;
export type asCatchPhraseNoun = string;
// export- type asCompanyBSAdjective = string;
// export- type asCompanyBSBuzz = string;
// export- type asCompanyBSNoun = string;

export type asDatabaseColumn = string;
export type asDatabaseType = string;
export type asDatabaseCollation = string;
export type asDatabaseEngine = string;

export type asDatePast<Years extends number = number, DateFrom extends string = string> = string;
export type asDateFuture<Years extends number = number, DateFrom extends string = string> = string;
export type asDateBetween<FromDate extends string | number, ToDate extends string> = string;
export type asDateRecent<Days extends number = number, DateFrom extends string = string> = string;
export type asDateSoon<Days extends number = number, DateFrom extends string = string> = string;
export type asMonth<Abbreviate extends boolean = boolean, Context extends boolean = boolean> = string;
export type asWeekday<Abbreviate extends boolean = boolean, Context extends boolean = boolean> = string;

export type asFinanceAccount<Length extends number = number> = string;
export type asFinanceAccountName = string;
export type asRoutingNumber = string;
// mask(length?: number, parens extends boolean = boolean, elipsis extends boolean = boolean> = string;
export type asCurrencyAmount<Min extends number = number, Max extends number = number, Dec extends number = number, Symbol extends string = string> = string;
export type asFinanceTransactionType = string;
export type asCurrencyCode = string;
export type asCurrencyName = string;
export type asCurrencySymbol = string;
export type asBitcoinAddress = string;
// iban<formatted extends boolean = boolean> = string;
// bic = string;
// litecoinAddress = string;
export type asCreditCardNumber<Provider extends string = string> = string;
export type asCreditCardCVV = string;
export type asEthereumAddress = string;
export type asFinanceTransactionDescription = string;

export type asGitBranch = string;
export type asGitCommitEntry<Merge extends boolean = boolean> = string;
export type asGitCommitMessage = string;
export type asGitCommitSha = string;
export type asGitShortSha = string;

export type asHackerAbbreviation = string;
export type asHackerAdjective = string;
export type asHackerNoun = string;
export type asHackerVerb = string;
export type asHackingVerb = string;
export type asHackerPhrase = string;

export type asImage = string;
export type asAvatar = string;
export type asImageUrl<Width extends number = number, Height extends number = number, Category extends string = string, Randomize extends boolean = boolean, Https extends boolean = boolean> = string;
export type asImageAbstract<Width extends number = number, Height extends number = number> = string;
export type asImageAnimal<Width extends number = number, Height extends number = number> = string;
export type asImageBusiness<Width extends number = number, Height extends number = number> = string;
export type asImageCats<Width extends number = number, Height extends number = number> = string;
export type asImageCity<Width extends number = number, Height extends number = number> = string;
export type asImageFood<Width extends number = number, Height extends number = number> = string;
export type asImageNightlife<Width extends number = number, Height extends number = number> = string;
export type asImageFashion<Width extends number = number, Height extends number = number> = string;
export type asImagePeople<Width extends number = number, Height extends number = number> = string;
export type asImageNature<Width extends number = number, Height extends number = number> = string;
export type asImageSports<Width extends number = number, Height extends number = number> = string;
export type asImageTechnics<Width extends number = number, Height extends number = number> = string;
export type asImageTransport<Width extends number = number, Height extends number = number> = string;
export type asImageDataUri<Width extends number = number, Height extends number = number, Color extends string = string> = string;

export type asInternetAvatar = string;
export type asEmail<FirstName extends string = string, lastName extends string = string, provider extends string = string> = string;
export type asExampleEmail<FirstName extends string = string, LastName extends string = string> = string;
export type asUserName<FirstName extends string = string, LastName extends string = string> = string;
export type asProtocol = string;
export type asUrl = string;
export type asDomainName = string;
export type asDomainSuffix = string;
export type asDomainWord = string;
export type asIP = string;
export type asIPv6 = string;
export type asUserAgent = string;
export type asRGB<Red extends number = number, Green extends number = number, Blue extends number = number> = string;
export type asMAC<Sep extends string = string> = string;
export type asPassword<Length extends number = number, Memorable extends boolean = boolean, Pattern extends string = string, Prefix extends string = string> = string;

export type asLoremWord<Length extends number = number> = string;
export type asLoremWords<WordCount extends number = number> = string;
export type asLoremSentence<WordCount extends number = number, Range extends number = number> = string;
export type asLoremSlug<WordCount extends number = number> = string;
export type asLoremSentences<SentenceCount extends number = number> = string;
export type asLoremParagraph<SentenceCount extends number = number> = string;
export type asLoremParagraphs<ParagraphCount extends number = number, Separator extends string = string> = string;
export type asLoremText<Times extends number = number> = string;
export type asLoremLines<LineCount extends number = number> = string;

export type Genders = 'male' | 'm' | 'female' | 'f';
export type asFirstName<Gender extends Genders = Genders> = string;
export type asLastName<Gender extends Genders = Genders> = string;
export type asMiddleName = string;
export type asJobTitle = string;
export type asGender = string;
export type asPrefix = string;
export type asSuffix = string;
export type asTitle = string;
export type asJobDescriptor = string;
export type asJobArea = string;
export type asJobType = string;

export type asGenre = string;

export type asPhoneNumber<Format extends string = string> = string;
export type asPhoneNumberFormat<PhoneFormatsArrayIndex extends number = number> = string;
export type asPhoneFormats = string;

export type asNumber<Max extends number = number> = number;
export type asNumberRange<Min extends number = number, Max extends number = number, Precision extends number = number> = number;
export type asFloat<Max extends number = number> = number;
export type asFloatRange<Min extends number = number, Max extends number = number, Precision extends number = number> = number;
export type asArrayElement = string;
export type asUUID = string;
export type asBoolean = boolean;
export type asWord<Type extends string = string> = string;
export type asWords<Count extends number = number> = string;
// export- type asImage = string;
export type asLocale = string;
export type asAlpha<Count extends number = number, UpperCase extends boolean = boolean> = string;
export type asAlphaNumeric<Count extends number = number> = string;
export type asHexaDecimal<Count extends number = number> = string;

export type asFileName<Ext extends string = string, Type extends string = string> = string;
export type asCommonFileName<Ext extends string, type extends string = string> = string;
export type asMimeType = string;
export type asCommonFileType = string;
export type asCommonFileExt = string;
export type asFileType = string;
export type asFileExt<MimeType extends string> = string;
export type asDirectoryPath = string;
export type asFilePath = string;
export type asSemVer = string;

// export- type asTime = number;
export type asUnixTime = number;
export type asTime<Kind extends 'abbr' | 'wide' = 'abbr'> = string;

export type asVehicle = string;
export type asVehicleManufacturer = string;
export type asVehicleModel = string;
export type asVehicleType = string;
export type asVehicleFuel = string;
export type asVehicleVIN = string;
export type asVehicleColor = string;

export type asJSON<T, TIndent extends number = undefined> = string;

// Modifications to the above need to be copied to this string. `export` needs to be removed from the string
// The above types are mostly just for validation and somestimes use if needed
export const lib = `

type Sometimes<Chance extends number, T> = T | undefined;
type BoundArray<T, Max extends number, Min extends number = 0> = T[];

type States = 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';
type asZipCodeByState<State extends States> = string;
type asZipCode = string;
type asCity = string;
type asCityPrefix = string;
type asCitySuffix = string;
type asStreetName = string;
type asStreetAddress<UseFullAddress extends boolean = false> = string;
type asStreetSuffix = string;
type asStreetPrefix = string;
type asSecondaryAddress = string;
type asCounty = string;
type asCountry = string;
type asCountryCode = string;
type asState<UseAbbr extends boolean = false> = string;
type asStateAbbr = string;
type asLatitude<Max extends number = number, Min extends number = number> = string;
type asLongitude<Max extends number = number, Min extends number = number> = string;
type asDirection = string;
type asCardinalDirection = string;
type asOrdinalDirection = string;
type asNearbyGPSCoordinate = string[];
type asTimeZone = string;

type asCommerceColor = string;
type asDepartment = string;
type asProductName = string;
type asPrice<Min extends number = number, Max extends number = number, Dec extends number = number, Symbol extends string = string> = string;
type asProductAdjective = string;
type asProductMaterial = string;
type asProduct = string;
type asProductDescription = string;

// export- type asSuffixes = string[];
type asCompanyName<Format extends string = string> = string;
type asCompanySuffix = string;
type asCompanyCatchPhrase = string;
// export- type asCompanyBS = string;
type asCatchPhraseAdjective = string;
type asCatchPhraseDescriptor = string;
type asCatchPhraseNoun = string;
// export- type asCompanyBSAdjective = string;
// export- type asCompanyBSBuzz = string;
// export- type asCompanyBSNoun = string;

type asDatabaseColumn = string;
type asDatabaseType = string;
type asDatabaseCollation = string;
type asDatabaseEngine = string;

type asDatePast<Years extends number = number, DateFrom extends string = string> = string;
type asDateFuture<Years extends number = number, DateFrom extends string = string> = string;
type asDateBetween<FromDate extends string | number, ToDate extends string> = string;
type asDateRecent<Days extends number = number, DateFrom extends string = string> = string;
type asDateSoon<Days extends number = number, DateFrom extends string = string> = string;
type asMonth<Abbreviate extends boolean = boolean, Context extends boolean = boolean> = string;
type asWeekday<Abbreviate extends boolean = boolean, Context extends boolean = boolean> = string;

type asFinanceAccount<Length extends number = number> = string;
type asFinanceAccountName = string;
type asRoutingNumber = string;
// mask(length?: number, parens extends boolean = boolean, elipsis extends boolean = boolean> = string;
type asCurrencyAmount<Min extends number = number, Max extends number = number, Dec extends number = number, Symbol extends string = string> = string;
type asFinanceTransactionType = string;
type asCurrencyCode = string;
type asCurrencyName = string;
type asCurrencySymbol = string;
type asBitcoinAddress = string;
// iban<formatted extends boolean = boolean> = string;
// bic = string;
// litecoinAddress = string;
type asCreditCardNumber<Provider extends string = string> = string;
type asCreditCardCVV = string;
type asEthereumAddress = string;
type asFinanceTransactionDescription = string;

type asGitBranch = string;
type asGitCommitEntry<Merge extends boolean = boolean> = string;
type asGitCommitMessage = string;
type asGitCommitSha = string;
type asGitShortSha = string;

type asHackerAbbreviation = string;
type asHackerAdjective = string;
type asHackerNoun = string;
type asHackerVerb = string;
type asHackingVerb = string;
type asHackerPhrase = string;

type asImage = string;
type asAvatar = string;
type asImageUrl<Width extends number = number, Height extends number = number, Category extends string = string, Randomize extends boolean = boolean, Https extends boolean = boolean> = string;
type asImageAbstract<Width extends number = number, Height extends number = number> = string;
type asImageAnimal<Width extends number = number, Height extends number = number> = string;
type asImageBusiness<Width extends number = number, Height extends number = number> = string;
type asImageCats<Width extends number = number, Height extends number = number> = string;
type asImageCity<Width extends number = number, Height extends number = number> = string;
type asImageFood<Width extends number = number, Height extends number = number> = string;
type asImageNightlife<Width extends number = number, Height extends number = number> = string;
type asImageFashion<Width extends number = number, Height extends number = number> = string;
type asImagePeople<Width extends number = number, Height extends number = number> = string;
type asImageNature<Width extends number = number, Height extends number = number> = string;
type asImageSports<Width extends number = number, Height extends number = number> = string;
type asImageTechnics<Width extends number = number, Height extends number = number> = string;
type asImageTransport<Width extends number = number, Height extends number = number> = string;
type asImageDataUri<Width extends number = number, Height extends number = number, Color extends string = string> = string;

type asInternetAvatar = string;
type asEmail<FirstName extends string = string, lastName extends string = string, provider extends string = string> = string;
type asExampleEmail<FirstName extends string = string, LastName extends string = string> = string;
type asUserName<FirstName extends string = string, LastName extends string = string> = string;
type asProtocol = string;
type asUrl = string;
type asDomainName = string;
type asDomainSuffix = string;
type asDomainWord = string;
type asIP = string;
type asIPv6 = string;
type asUserAgent = string;
type asRGB<Red extends number = number, Green extends number = number, Blue extends number = number> = string;
type asMAC<Sep extends string = string> = string;
type asPassword<Length extends number = number, Memorable extends boolean = boolean, Pattern extends string = string, Prefix extends string = string> = string;

type asLoremWord<Length extends number = number> = string;
type asLoremWords<WordCount extends number = number> = string;
type asLoremSentence<WordCount extends number = number, Range extends number = number> = string;
type asLoremSlug<WordCount extends number = number> = string;
type asLoremSentences<SentenceCount extends number = number> = string;
type asLoremParagraph<SentenceCount extends number = number> = string;
type asLoremParagraphs<ParagraphCount extends number = number, Separator extends string = string> = string;
type asLoremText<Times extends number = number> = string;
type asLoremLines<LineCount extends number = number> = string;

type Genders = 'male' | 'm' | 'female' | 'f';
type asFirstName<Gender extends Genders = Genders> = string;
type asLastName<Gender extends Genders = Genders> = string;
type asMiddleName = string;
type asJobTitle = string;
type asGender = string;
type asPrefix = string;
type asSuffix = string;
type asTitle = string;
type asJobDescriptor = string;
type asJobArea = string;
type asJobType = string;

type asGenre = string;

type asPhoneNumber<Format extends string = string> = string;
type asPhoneNumberFormat<PhoneFormatsArrayIndex extends number = number> = string;
type asPhoneFormats = string;

type asNumber<Max extends number = number> = number;
type asNumberRange<Min extends number = number, Max extends number = number, Precision extends number = number> = number;
type asFloat<Max extends number = number> = number;
type asFloatRange<Min extends number = number, Max extends number = number, Precision extends number = number> = number;
type asArrayElement = string;
type asUUID = string;
type asBoolean = boolean;
type asWord<Type extends string = string> = string;
type asWords<Count extends number = number> = string;
// export- type asImage = string;
type asLocale = string;
type asAlpha<Count extends number = number, UpperCase extends boolean = boolean> = string;
type asAlphaNumeric<Count extends number = number> = string;
type asHexaDecimal<Count extends number = number> = string;

type asFileName<Ext extends string = string, Type extends string = string> = string;
type asCommonFileName<Ext extends string, type extends string = string> = string;
type asMimeType = string;
type asCommonFileType = string;
type asCommonFileExt = string;
type asFileType = string;
type asFileExt<MimeType extends string> = string;
type asDirectoryPath = string;
type asFilePath = string;
type asSemVer = string;

// export- type asTime = number;
type asUnixTime = number;
type asTime<Kind extends 'abbr' | 'wide' = 'abbr'> = string;

type asVehicle = string;
type asVehicleManufacturer = string;
type asVehicleModel = string;
type asVehicleType = string;
type asVehicleFuel = string;
type asVehicleVIN = string;
type asVehicleColor = string;

type asJSON<T, TIndent extends number = undefined> = string;

`;
