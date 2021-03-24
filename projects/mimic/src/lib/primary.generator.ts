import * as faker from 'faker';
import {
    MimicGenerator,
    MimicPrimaryKind,
    MimicPrimaryArg,
} from './contracts';

export type MimicPrimaryResolvedArg =
    Exclude<MimicPrimaryArg, object>
    | MimicGenerator
    | Date
    | RegExp
    | MimicPrimaryResolvedArg[]
    | readonly MimicPrimaryResolvedArg[];

type PrimaryMappings = {
    [T in MimicPrimaryKind]?: (...args: MimicPrimaryResolvedArg[]) => any;
};

const minMaxRange = (fn: Function) => (min?: number, max?: number, precision?: number) => fn({
    max,
    min,
    precision,
});

const abbrContext = (fn: Function) => (abbr?: boolean, context?: boolean) => fn({
    abbr,
    context,
});

const primaryMappings: PrimaryMappings = {
    [MimicPrimaryKind.asZipCodeByState]: faker.address.zipCodeByState,
    [MimicPrimaryKind.asZipCode]: faker.address.zipCode,
    [MimicPrimaryKind.asCity]: faker.address.city,
    [MimicPrimaryKind.asCityPrefix]: faker.address.cityPrefix,
    [MimicPrimaryKind.asCitySuffix]: faker.address.citySuffix,
    [MimicPrimaryKind.asStreetName]: faker.address.streetName,
    [MimicPrimaryKind.asStreetAddress]: faker.address.streetAddress,
    [MimicPrimaryKind.asStreetSuffix]: faker.address.streetSuffix,
    [MimicPrimaryKind.asStreetPrefix]: faker.address.streetPrefix,
    [MimicPrimaryKind.asSecondaryAddress]: faker.address.secondaryAddress,
    [MimicPrimaryKind.asCounty]: faker.address.county,
    [MimicPrimaryKind.asCountry]: faker.address.country,
    [MimicPrimaryKind.asCountryCode]: faker.address.countryCode,
    [MimicPrimaryKind.asState]: faker.address.state,
    [MimicPrimaryKind.asStateAbbr]: faker.address.stateAbbr,
    [MimicPrimaryKind.asLatitude]: faker.address.latitude,
    [MimicPrimaryKind.asLongitude]: faker.address.longitude,
    [MimicPrimaryKind.asDirection]: faker.address.direction,
    [MimicPrimaryKind.asCardinalDirection]: faker.address.cardinalDirection,
    [MimicPrimaryKind.asOrdinalDirection]: faker.address.ordinalDirection,
    [MimicPrimaryKind.asNearbyGPSCoordinate]: faker.address.nearbyGPSCoordinate,
    [MimicPrimaryKind.asTimeZone]: faker.address.timeZone,
    [MimicPrimaryKind.asCommerceColor]: faker.commerce.color,
    [MimicPrimaryKind.asDepartment]: faker.commerce.department,
    [MimicPrimaryKind.asProductName]: faker.commerce.productName,
    [MimicPrimaryKind.asPrice]: faker.commerce.price,
    [MimicPrimaryKind.asProductAdjective]: faker.commerce.productAdjective,
    [MimicPrimaryKind.asProductMaterial]: faker.commerce.productMaterial,
    [MimicPrimaryKind.asProduct]: faker.commerce.product,
    [MimicPrimaryKind.asProductDescription]: faker.commerce.productDescription,
    [MimicPrimaryKind.asCompanyName]: faker.company.companyName,
    [MimicPrimaryKind.asCompanySuffix]: faker.company.companySuffix,
    [MimicPrimaryKind.asCompanyCatchPhrase]: faker.company.catchPhrase,
    [MimicPrimaryKind.asCatchPhraseAdjective]: faker.company.catchPhraseAdjective,
    [MimicPrimaryKind.asCatchPhraseDescriptor]: faker.company.catchPhraseDescriptor,
    [MimicPrimaryKind.asCatchPhraseNoun]: faker.company.catchPhraseNoun,
    [MimicPrimaryKind.asDatabaseColumn]: faker.database.column,
    [MimicPrimaryKind.asDatabaseType]: faker.database.type,
    [MimicPrimaryKind.asDatabaseCollation]: faker.database.collation,
    [MimicPrimaryKind.asDatabaseEngine]: faker.database.engine,
    [MimicPrimaryKind.asDatePast]: faker.date.past,
    [MimicPrimaryKind.asDateFuture]: faker.date.future,
    [MimicPrimaryKind.asDateBetween]: faker.date.between,
    [MimicPrimaryKind.asDateRecent]: faker.date.recent,
    [MimicPrimaryKind.asDateSoon]: faker.date.soon,
    [MimicPrimaryKind.asMonth]: abbrContext(faker.date.month),
    [MimicPrimaryKind.asWeekday]: abbrContext(faker.date.weekday),
    [MimicPrimaryKind.asFinanceAccount]: faker.finance.account,
    [MimicPrimaryKind.asFinanceAccountName]: faker.finance.accountName,
    [MimicPrimaryKind.asRoutingNumber]: faker.finance.routingNumber,
    [MimicPrimaryKind.asCurrencyAmount]: faker.finance.amount,
    [MimicPrimaryKind.asFinanceTransactionType]: faker.finance.transactionType,
    [MimicPrimaryKind.asCurrencyCode]: faker.finance.currencyCode,
    [MimicPrimaryKind.asCurrencyName]: faker.finance.currencyName,
    [MimicPrimaryKind.asCurrencySymbol]: faker.finance.currencySymbol,
    [MimicPrimaryKind.asBitcoinAddress]: faker.finance.bitcoinAddress,
    [MimicPrimaryKind.asCreditCardNumber]: faker.finance.creditCardNumber,
    [MimicPrimaryKind.asCreditCardCVV]: faker.finance.creditCardCVV,
    [MimicPrimaryKind.asEthereumAddress]: faker.finance.ethereumAddress,
    [MimicPrimaryKind.asFinanceTransactionDescription]: faker.finance.transactionDescription,
    [MimicPrimaryKind.asGitBranch]: faker.git.branch,
    [MimicPrimaryKind.asGitCommitEntry]: (merge?: boolean) => faker.git.commitEntry({
        merge,
    }),
    [MimicPrimaryKind.asGitCommitMessage]: faker.git.commitMessage,
    [MimicPrimaryKind.asGitCommitSha]: faker.git.commitSha,
    [MimicPrimaryKind.asGitShortSha]: faker.git.shortSha,
    [MimicPrimaryKind.asHackerAbbreviation]: faker.hacker.abbreviation,
    [MimicPrimaryKind.asHackerAdjective]: faker.hacker.adjective,
    [MimicPrimaryKind.asHackerNoun]: faker.hacker.noun,
    [MimicPrimaryKind.asHackerVerb]: faker.hacker.verb,
    [MimicPrimaryKind.asHackingVerb]: faker.hacker.ingverb,
    [MimicPrimaryKind.asHackerPhrase]: faker.hacker.phrase,
    [MimicPrimaryKind.asImage]: faker.image.image,
    [MimicPrimaryKind.asAvatar]: faker.image.avatar,
    [MimicPrimaryKind.asImageUrl]: faker.image.imageUrl,
    [MimicPrimaryKind.asImageAbstract]: faker.image.abstract,
    [MimicPrimaryKind.asImageAnimal]: faker.image.animals,
    [MimicPrimaryKind.asImageBusiness]: faker.image.business,
    [MimicPrimaryKind.asImageCats]: faker.image.cats,
    [MimicPrimaryKind.asImageCity]: faker.image.city,
    [MimicPrimaryKind.asImageFood]: faker.image.food,
    [MimicPrimaryKind.asImageNightlife]: faker.image.nightlife,
    [MimicPrimaryKind.asImageFashion]: faker.image.fashion,
    [MimicPrimaryKind.asImagePeople]: faker.image.people,
    [MimicPrimaryKind.asImageNature]: faker.image.nature,
    [MimicPrimaryKind.asImageSports]: faker.image.sports,
    [MimicPrimaryKind.asImageTechnics]: faker.image.technics,
    [MimicPrimaryKind.asImageTransport]: faker.image.transport,
    [MimicPrimaryKind.asImageDataUri]: faker.image.dataUri,
    [MimicPrimaryKind.asInternetAvatar]: faker.internet.avatar,
    [MimicPrimaryKind.asEmail]: faker.internet.email,
    [MimicPrimaryKind.asExampleEmail]: faker.internet.exampleEmail,
    [MimicPrimaryKind.asUserName]: faker.internet.userName,
    [MimicPrimaryKind.asProtocol]: faker.internet.protocol,
    [MimicPrimaryKind.asUrl]: faker.internet.url,
    [MimicPrimaryKind.asDomainName]: faker.internet.domainName,
    [MimicPrimaryKind.asDomainSuffix]: faker.internet.domainSuffix,
    [MimicPrimaryKind.asDomainWord]: faker.internet.domainWord,
    [MimicPrimaryKind.asIP]: faker.internet.ip,
    [MimicPrimaryKind.asIPv6]: faker.internet.ipv6,
    [MimicPrimaryKind.asUserAgent]: faker.internet.userAgent,
    [MimicPrimaryKind.asRGB]: faker.internet.color,
    [MimicPrimaryKind.asMAC]: faker.internet.mac,
    [MimicPrimaryKind.asPassword]: faker.internet.password,
    [MimicPrimaryKind.asLoremWord]: faker.lorem.word,
    [MimicPrimaryKind.asLoremWords]: faker.lorem.words,
    [MimicPrimaryKind.asLoremSentence]: faker.lorem.sentence,
    [MimicPrimaryKind.asLoremSlug]: faker.lorem.slug,
    [MimicPrimaryKind.asLoremSentences]: faker.lorem.sentences,
    [MimicPrimaryKind.asLoremParagraph]: faker.lorem.paragraph,
    [MimicPrimaryKind.asLoremParagraphs]: faker.lorem.paragraphs,
    [MimicPrimaryKind.asLoremText]: faker.lorem.text,
    [MimicPrimaryKind.asLoremLines]: faker.lorem.lines,
    [MimicPrimaryKind.asFirstName]: faker.name.firstName,
    [MimicPrimaryKind.asLastName]: faker.name.lastName,
    [MimicPrimaryKind.asMiddleName]: faker.name.middleName,
    [MimicPrimaryKind.asJobTitle]: faker.name.jobTitle,
    [MimicPrimaryKind.asGender]: faker.name.gender,
    [MimicPrimaryKind.asPrefix]: faker.name.prefix,
    [MimicPrimaryKind.asSuffix]: faker.name.suffix,
    [MimicPrimaryKind.asTitle]: faker.name.title,
    [MimicPrimaryKind.asJobDescriptor]: faker.name.jobDescriptor,
    [MimicPrimaryKind.asJobArea]: faker.name.jobArea,
    [MimicPrimaryKind.asJobType]: faker.name.jobType,
    [MimicPrimaryKind.asGenre]: faker.music.genre,
    [MimicPrimaryKind.asPhoneNumber]: faker.phone.phoneNumber,
    [MimicPrimaryKind.asPhoneNumberFormat]: faker.phone.phoneNumberFormat,
    [MimicPrimaryKind.asPhoneFormats]: faker.phone.phoneFormats,
    [MimicPrimaryKind.asNumber]: faker.random.number,
    [MimicPrimaryKind.asNumberRange]: minMaxRange(faker.random.number),
    [MimicPrimaryKind.asFloat]: faker.random.float,
    [MimicPrimaryKind.asFloatRange]: minMaxRange(faker.random.float),
    [MimicPrimaryKind.asArrayElement]: faker.random.arrayElement,
    [MimicPrimaryKind.asUUID]: faker.random.uuid,
    [MimicPrimaryKind.asBoolean]: faker.random.boolean,
    [MimicPrimaryKind.asWord]: faker.random.word,
    [MimicPrimaryKind.asWords]: faker.random.words,
    [MimicPrimaryKind.asLocale]: faker.random.locale,
    [MimicPrimaryKind.asAlpha]: (count?: number, upcase?: boolean) => faker.random.alpha({
        count,
        upcase,
    }),
    [MimicPrimaryKind.asAlphaNumeric]: faker.random.alphaNumeric,
    [MimicPrimaryKind.asHexaDecimal]: faker.random.hexaDecimal,
    [MimicPrimaryKind.asFileName]: faker.system.fileName,
    [MimicPrimaryKind.asCommonFileName]: faker.system.commonFileName,
    [MimicPrimaryKind.asMimeType]: faker.system.mimeType,
    [MimicPrimaryKind.asCommonFileType]: faker.system.commonFileType,
    [MimicPrimaryKind.asCommonFileExt]: faker.system.commonFileExt,
    [MimicPrimaryKind.asFileType]: faker.system.fileType,
    [MimicPrimaryKind.asFileExt]: faker.system.fileExt,
    [MimicPrimaryKind.asDirectoryPath]: faker.system.directoryPath,
    [MimicPrimaryKind.asFilePath]: faker.system.filePath,
    [MimicPrimaryKind.asSemVer]: faker.system.semver,
    [MimicPrimaryKind.asUnixTime]: faker.time.recent,
    [MimicPrimaryKind.asTime]: (kind: 'abbr' | 'wide' = 'abbr') => faker.time.recent(kind),
    [MimicPrimaryKind.asVehicle]: faker.vehicle.vehicle,
    [MimicPrimaryKind.asVehicleManufacturer]: faker.vehicle.manufacturer,
    [MimicPrimaryKind.asVehicleModel]: faker.vehicle.model,
    [MimicPrimaryKind.asVehicleType]: faker.vehicle.type,
    [MimicPrimaryKind.asVehicleFuel]: faker.vehicle.fuel,
    [MimicPrimaryKind.asVehicleVIN]: faker.vehicle.vin,
    [MimicPrimaryKind.asVehicleColor]: faker.vehicle.color,
    [MimicPrimaryKind.asJSON]: (generator: MimicGenerator, indent: number) => JSON.stringify(generator(), undefined, indent),
};

export const generatePrimary = (primary: MimicPrimaryKind, args: MimicPrimaryResolvedArg[]) => {
    const primaryMapping = primaryMappings[primary];
    return primaryMapping
        ? primaryMapping(...args)
        : undefined;
};
