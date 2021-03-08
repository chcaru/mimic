
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
export type asLatitude<Max extends number = undefined, Min extends number = undefined> = string;
export type asLongitude<Max extends number = undefined, Min extends number = undefined> = string;
export type asDirection = string;
export type asCardinalDirection = string;
export type asOrdinalDirection = string;
export type asNearbyGPSCoordinate = string;
export type asTimeZone = string;

export type asCommerceColor = string;
export type asDepartment = string;
export type asProductName = string;
export type asPrice<Min extends number = undefined, Max extends number = undefined, Dec extends number = undefined, Symbol extends string = undefined> = string;
export type asProductAdjective = string;
export type asProductMaterial = string;
export type asProduct = string;
export type asProductDescription = string;

// export- type asSuffixes = string[];
export type asCompanyName<Format extends string> = string;
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

export type asDatePast<Years extends number = undefined, DateFrom extends string = undefined> = string;
export type asDateFuture<Years extends number = undefined, DateFrom extends string = undefined> = string;
export type asDateBetween<FromDate extends string | number, ToDate extends string> = string;
export type asDateRecent<Days extends number = undefined, DateFrom extends string = undefined> = string;
export type asDateSoon<Days extends number = undefined, DateFrom extends string = undefined> = string;
export type asMonth = string;
export type asWeekday = string;

export type asFinanceAccount<Length extends number = undefined> = string;
export type asFinanceAccountName = string;
export type asRoutingNumber = string;
// mask(length?: number, parens extends boolean = undefined, elipsis extends boolean = undefined> = string;
export type asCurrencyAmount<Min extends number = undefined, Max extends number = undefined, Dec extends number = undefined, Symbol extends string = undefined> = string;
export type asFinanceTransactionType = string;
export type asCurrencyCode = string;
export type asCurrencyName = string;
export type asCurrencySymbol = string;
export type asBitcoinAddress = string;
// iban<formatted extends boolean = undefined> = string;
// bic = string;
// litecoinAddress = string;
export type asCreditCardNumber<Provider extends string = undefined> = string;
export type asCreditCardCVV = string;
export type asEthereumAddress = string;
export type asFinanceTransactionDescription = string;

export type asGitBranch = string;
export type asGitCommitEntry = string;
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
export type asImageUrl<Width extends number = undefined, Height extends number = undefined, Category extends string = undefined, Randomize extends boolean = undefined, Https extends boolean = undefined> = string;
export type asImageAbstract<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageAnimal<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageBusiness<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageCats<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageCity<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageFood<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageNightlife<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageFashion<Width extends number = undefined, Height extends number = undefined> = string;
export type asImagePeople<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageNature<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageSports<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageTechnics<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageTransport<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageDataUri<Width extends number = undefined, Height extends number = undefined, Color extends string = undefined> = string;

export type asInternetAvatar = string;
export type asEmail<FirstName extends string = undefined, lastName extends string = undefined, provider extends string = undefined> = string;
export type asExampleEmail<FirstName extends string = undefined, LastName extends string = undefined> = string;
export type asUserName<FirstName extends string = undefined, LastName extends string = undefined> = string;
export type asProtocol = string;
export type asUrl = string;
export type asDomainName = string;
export type asDomainSuffix = string;
export type asDomainWord = string;
export type asIP = string;
export type asIPv6 = string;
export type asUserAgent = string;
export type asRGB<Red extends number = undefined, Green extends number = undefined, Blue extends number = undefined> = string;
export type asMAC<Sep extends string = undefined> = string;
export type asPassword<Length extends number = undefined, Memorable extends boolean = undefined, Pattern extends string = undefined, Prefix extends string = undefined> = string;

export type asLoremWord<Length extends number = undefined> = string;
export type asLoremWords<WordCount extends number = undefined> = string;
export type asLoremSentence<WordCount extends number = undefined, Range extends number = undefined> = string;
export type asLoremSlug<WordCount extends number = undefined> = string;
export type asLoremSentences<SentenceCount extends number = undefined> = string;
export type asLoremParagraph<SentenceCount extends number = undefined> = string;
export type asLoremParagraphs<ParagraphCount extends number = undefined, Separator extends string = undefined> = string;
export type asLoremText<Times extends number = undefined> = string;
export type asLoremLines<LineCount extends number = undefined> = string;

export type Genders = 'male' | 'm' | 'female' | 'f';
export type asFirstName<Gender extends Genders = undefined> = string;
export type asLastName<Gender extends Genders = undefined> = string;
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

export type asPhoneNumber<Format extends string = undefined> = string;
export type asPhoneNumberFormat<PhoneFormatsArrayIndex extends number = undefined> = string;
export type asPhoneFormats = string;

export type asNumber<Max extends number = undefined> = number;
export type asNumberRange<Min extends number = undefined, Max extends number = undefined, Precision extends number = undefined> = number;
export type asFloat<Max extends number = undefined> = number;
export type asFloatRange<Min extends number = undefined, Max extends number = undefined, Precision extends number = undefined> = number;
export type asArrayElement = string;
export type asUUID = string;
export type asBoolean = boolean;
export type asWord<Type extends string = undefined> = string;
export type asWords<Count extends number = undefined> = string;
// export- type asImage = string;
export type asLocale = string;
export type asAlpha<Count extends number = undefined, UpperCase extends boolean = undefined> = string;
export type asAlphaNumeric<Count extends number = undefined> = string;
export type asHexaDecimal<Count extends number = undefined> = string;

export type asFileName<Ext extends string = undefined, Type extends string = undefined> = string;
export type asCommonFileName<Ext extends string, type extends string = undefined> = string;
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
export type asTime<Kind extends 'abbr' | 'wide'> = string;

export type asVehicle = string;
export type asVehicleManufacturer = string;
export type asVehicleModel = string;
export type asVehicleType = string;
export type asVehicleFuel = string;
export type asVehicleVIN = string;
export type asVehicleColor = string;

// Modifications to the above need to be copied to this string.
// The above types are mostly just for validation and somestimes use if needed
export const lib = `

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
export type asLatitude<Max extends number = undefined, Min extends number = undefined> = string;
export type asLongitude<Max extends number = undefined, Min extends number = undefined> = string;
export type asDirection = string;
export type asCardinalDirection = string;
export type asOrdinalDirection = string;
export type asNearbyGPSCoordinate = string;
export type asTimeZone = string;

export type asCommerceColor = string;
export type asDepartment = string;
export type asProductName = string;
export type asPrice<Min extends number = undefined, Max extends number = undefined, Dec extends number = undefined, Symbol extends string = undefined> = string;
export type asProductAdjective = string;
export type asProductMaterial = string;
export type asProduct = string;
export type asProductDescription = string;

// export- type asSuffixes = string[];
export type asCompanyName<Format extends string> = string;
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

export type asDatePast<Years extends number = undefined, DateFrom extends string = undefined> = string;
export type asDateFuture<Years extends number = undefined, DateFrom extends string = undefined> = string;
export type asDateBetween<FromDate extends string | number, ToDate extends string> = string;
export type asDateRecent<Days extends number = undefined, DateFrom extends string = undefined> = string;
export type asDateSoon<Days extends number = undefined, DateFrom extends string = undefined> = string;
export type asMonth = string;
export type asWeekday = string;

export type asFinanceAccount<Length extends number = undefined> = string;
export type asFinanceAccountName = string;
export type asRoutingNumber = string;
// mask(length?: number, parens extends boolean = undefined, elipsis extends boolean = undefined> = string;
export type asCurrencyAmount<Min extends number = undefined, Max extends number = undefined, Dec extends number = undefined, Symbol extends string = undefined> = string;
export type asFinanceTransactionType = string;
export type asCurrencyCode = string;
export type asCurrencyName = string;
export type asCurrencySymbol = string;
export type asBitcoinAddress = string;
// iban<formatted extends boolean = undefined> = string;
// bic = string;
// litecoinAddress = string;
export type asCreditCardNumber<Provider extends string = undefined> = string;
export type asCreditCardCVV = string;
export type asEthereumAddress = string;
export type asFinanceTransactionDescription = string;

export type asGitBranch = string;
export type asGitCommitEntry = string;
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
export type asImageUrl<Width extends number = undefined, Height extends number = undefined, Category extends string = undefined, Randomize extends boolean = undefined, Https extends boolean = undefined> = string;
export type asImageAbstract<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageAnimal<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageBusiness<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageCats<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageCity<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageFood<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageNightlife<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageFashion<Width extends number = undefined, Height extends number = undefined> = string;
export type asImagePeople<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageNature<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageSports<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageTechnics<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageTransport<Width extends number = undefined, Height extends number = undefined> = string;
export type asImageDataUri<Width extends number = undefined, Height extends number = undefined, Color extends string = undefined> = string;

export type asInternetAvatar = string;
export type asEmail<FirstName extends string = undefined, lastName extends string = undefined, provider extends string = undefined> = string;
export type asExampleEmail<FirstName extends string = undefined, LastName extends string = undefined> = string;
export type asUserName<FirstName extends string = undefined, LastName extends string = undefined> = string;
export type asProtocol = string;
export type asUrl = string;
export type asDomainName = string;
export type asDomainSuffix = string;
export type asDomainWord = string;
export type asIP = string;
export type asIPv6 = string;
export type asUserAgent = string;
export type asRGB<Red extends number = undefined, Green extends number = undefined, Blue extends number = undefined> = string;
export type asMAC<Sep extends string = undefined> = string;
export type asPassword<Length extends number = undefined, Memorable extends boolean = undefined, Pattern extends string = undefined, Prefix extends string = undefined> = string;

export type asLoremWord<Length extends number = undefined> = string;
export type asLoremWords<WordCount extends number = undefined> = string;
export type asLoremSentence<WordCount extends number = undefined, Range extends number = undefined> = string;
export type asLoremSlug<WordCount extends number = undefined> = string;
export type asLoremSentences<SentenceCount extends number = undefined> = string;
export type asLoremParagraph<SentenceCount extends number = undefined> = string;
export type asLoremParagraphs<ParagraphCount extends number = undefined, Separator extends string = undefined> = string;
export type asLoremText<Times extends number = undefined> = string;
export type asLoremLines<LineCount extends number = undefined> = string;

export type Genders = 'male' | 'm' | 'female' | 'f';
export type asFirstName<Gender extends Genders = undefined> = string;
export type asLastName<Gender extends Genders = undefined> = string;
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

export type asPhoneNumber<Format extends string = undefined> = string;
export type asPhoneNumberFormat<PhoneFormatsArrayIndex extends number = undefined> = string;
export type asPhoneFormats = string;

export type asNumber<Max extends number = undefined> = number;
export type asNumberRange<Min extends number = undefined, Max extends number = undefined, Precision extends number = undefined> = number;
export type asFloat<Max extends number = undefined> = number;
export type asFloatRange<Min extends number = undefined, Max extends number = undefined, Precision extends number = undefined> = number;
export type asArrayElement = string;
export type asUUID = string;
export type asBoolean = boolean;
export type asWord<Type extends string = undefined> = string;
export type asWords<Count extends number = undefined> = string;
// export- type asImage = string;
export type asLocale = string;
export type asAlpha<Count extends number = undefined, UpperCase extends boolean = undefined> = string;
export type asAlphaNumeric<Count extends number = undefined> = string;
export type asHexaDecimal<Count extends number = undefined> = string;

export type asFileName<Ext extends string = undefined, Type extends string = undefined> = string;
export type asCommonFileName<Ext extends string, type extends string = undefined> = string;
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
export type asTime<Kind extends 'abbr' | 'wide'> = string;

export type asVehicle = string;
export type asVehicleManufacturer = string;
export type asVehicleModel = string;
export type asVehicleType = string;
export type asVehicleFuel = string;
export type asVehicleVIN = string;
export type asVehicleColor = string;

`;
