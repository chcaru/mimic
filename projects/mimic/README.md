# TypeScript Data Generator

## What
Use TypeScript to generate endless mock data.

## Why
TypeScript's type system is very expressive and easy to use, making it perfect to define the shape of mock data.

ts-mimic was built to easily define mock data sent to EventHub: https://eventhub.chriscaruso.dev

## How
ts-mimic provides a set of types that map to [specific types](#generator-types) of mock data. It can even guess the kind of mock data just from property names!

## Installation

Install this package through npm

```
npm i ts-mimic typescript@~4.1.5
```

## Examples

Try it out: https://mimic.chriscaruso.dev

### Simple example

``` ts
import { mimic } from 'ts-mimic';

const ts = `
interface Person {
    firstName: asFirstName; // Use built in mock data generators. See below for a complete list.
    lastName: asLastName;
    age: asNumberRange<20, 30>; // Some mock data generators can take parameters to customize them.
    address; // Auto detect mock data from the property name.
    secondaryAddress?: asSecondaryAddress; // Properties can be optional. These have a 50% chance of being undefined.
    state?;
    city: asCity;
    image: Sometimes<.75, asImagePeople>; // Sometimes is a special type that lets you specify the chance a value will be defined
}`;

const { map: { Person } } = mimic(ts);
const mockPerson = Person();

console.log(mockPerson);
```

#### Possible output

``` ts
{
    firstName: "Zion",
    lastName: "Block",
    age: 23,
    address: "25612 Rath Avenue",
    secondaryAddress: undefined,
    state: "Utah",
    city: "Alvinaview",
    image: "http://placeimg.com/640/480/people",
}
```

### Full example

Play with this example live at https://mimic.chriscaruso.dev

``` ts
import { mimic } from 'ts-mimic';

const ts = `
interface Name {
    firstName: asFirstName; // Use built in mock data generators. See below for a complete list.
    lastName: asLastName;
}

interface Address {
    address; // Auto detect mock data
    secondaryAddress?: asSecondaryAddress; // Properties can be optional. These have a 50% chance of being undefined
    state?;
    city: \`City: \${asCity}\`; // Use template literals to define compound strings
}

interface BitcoinWallet {
    type: 'bitcoin'; // Use type literals for static data
    bitcoinAddress;
}

interface EtheriumWallet {
    type: 'etherium';
    etheriumAddress;
}

// Use type aliases to create convenient types (ex. union, array, literal types)
type DigitalWallet = BitcoinWallet | EtheriumWallet; // Union types for an equal chance at any of them

interface Person {
    name: Name; // Reference other defined types
    address: Address;
    digitalWallet?: DigitalWallet;
    age: asNumberRange<20, 30>; // Some mock data generators can take parameters to customize them.
    image?: Sometimes<.75, asImagePeople>; // Sometimes is a special type that lets you specify the chance a value will be defined
}

// Use type aliases to represent type literals
type Team = {
    members: BoundArray<Person, 6, 2>; // BoundArray is a special type that lets you specify the range of an array
};

// Use type aliases to represent top level array types
type People = Person[]; // Arrays have a random range of 0 to 10 elements

// Use tuples to represent more precise arrays
type Couple = [Person, Person];`;

const { definitions } = mimic(ts);

// Print out each generator's possible output
for (const { name, generator } of definitions) {
    console.log(
        name, 
        generator(),
    );
}
```

## Provided types

### Special types

| Name | Parameters | Return type | Description | Example |
|------|------------|-------------|-------------|---------|
| `BoundArray` | `T: any` <br> `Max: number` <br> `Min?: number = 0` | `T[]` | Specifies the size range of an array | `BoundArray<asEmail, 20, 10>` |
| `Sometimes` | `Chance: number` <br> `T: any` | `T \| undefined` | Specifies the chance `T` will be defined | `Sometimes<.7, asEmail>` |

### Generator types

| Name | Parameters | Return type | Example output |
|------|------------|-------------|----------------|
| `asAlpha` | `Count?: number = 1` <br> `UpperCase?: boolean = false` | `string` | `"n"`
| `asAlphaNumeric` | `Count?: number = 1` | `string` | `"t"`
| `asArrayElement` | | `string` | `"a"`
| `asAvatar` | | `string` | `"https://s3.amazonaws.com/uifaces/faces/twitter/jjsiii/128.jpg"`
| `asBitcoinAddress` | | `string` | `"3B7qyhh8KcSwnYoYPvfPHmxCSawHutn"`
| `asBoolean` | | `boolean` | `true`
| `asCardinalDirection` | | `string` | `"West"`
| `asCatchPhraseAdjective` | | `string` | `"Self-enabling"`
| `asCatchPhraseDescriptor` | | `string` | `"multimedia"`
| `asCatchPhraseNoun` | | `string` | `"moratorium"`
| `asCity` | | `string` | `"Brockberg"`
| `asCityPrefix` | | `string` | `"Lake"`
| `asCitySuffix` | | `string` | `"berg"`
| `asCommerceColor` | | `string` | `"lime"`
| `asCommonFileExt` | | `string` | `"jpg"`
| `asCommonFileName` | `Ext?: string` <br> `Type?: string` | `string` | `"buckinghamshire.gif"`
| `asCommonFileType` | | `string` | `"application"`
| `asCompanyCatchPhrase` | | `string` | `"User-centric fault-tolerant alliance"`
| `asCompanyName` | `Format?: string` | `string` | `"O'Conner - Littel"`
| `asCompanySuffix` | | `string` | `"LLC"`
| `asCountry` | | `string` | `"Djibouti"`
| `asCountryCode` | | `string` | `"CA"`
| `asCounty` | | `string` | `"Borders"`
| `asCreditCardCVV` | | `string` | `"076"`
| `asCreditCardNumber` | `Provider?: string` | `string` | `"3528-6276-6216-8478"`
| `asCurrencyAmount` | `Min?: number` <br> `Max?: number` <br> `Dec?: number` <br> `Symbol?: string` | `string` | `"120.35"`
| `asCurrencyCode` | | `string` | `"DZD"`
| `asCurrencyName` | | `string` | `"Indian Rupee"`
| `asCurrencySymbol` | | `string` | `"¥"`
| `asDatabaseCollation` | | `string` | `"utf8_unicode_ci"`
| `asDatabaseColumn` | | `string` | `"status"`
| `asDatabaseEngine` | | `string` | `"InnoDB"`
| `asDatabaseType` | | `string` | `"tinyint"`
| `asDateBetween` | `FromDate: string` <br> `ToDate: string` | `string` | `"2021-04-19T08:38:54.605Z"`
| `asDateFuture` | `Years?: number` <br> `DateFrom?: string` | `string` | `"2021-05-23T11:37:10.412Z"`
| `asDatePast` | `Years?: number` <br> `DateFrom?: string` | `string` | `"2021-01-30T15:27:04.763Z"`
| `asDateRecent` | `Days?: number` <br> `DateFrom?: string` | `string` | `"2021-03-26T01:21:00.681Z"`
| `asDateSoon` | `Days?: number` <br> `DateFrom?: string` | `string` | `"2021-03-27T06:11:06.507Z"`
| `asDepartment` | | `string` | `"Health"`
| `asDirection` | | `string` | `"Southwest"`
| `asDirectoryPath` | | `string` | `"/root"`
| `asDomainName` | | `string` | `"tanner.com"`
| `asDomainSuffix` | | `string` | `"org"`
| `asDomainWord` | | `string` | `"tommie"`
| `asEmail` | `FirstName?: string` <br> `LastName?: string` <br> `Provider?: string` | `string` | `"Frankie27@yahoo.com"`
| `asEthereumAddress` | | `string` | `"0x2c5ffaafb99bbf3ae3753a467cfa4f8fd225dea7"`
| `asExampleEmail` | `FirstName?: string` <br> `LastName?: string` | `string` | `"Ashlynn_Borer49@example.org"`
| `asFileExt` | `MimeType?: string` | `string` | `"metalink"`
| `asFileName` | `Ext?: string` <br> `Type?: string` | `string` | `"loan.ecelp9600"`
| `asFilePath` | | `string` | `"/home/human_resource_optimized.sub"`
| `asFileType` | | `string` | `"x-shader"`
| `asFinanceAccount` | `Length?: number` | `string` | `"34792807"`
| `asFinanceAccountName` | | `string` | `"Auto Loan Account"`
| `asFinanceTransactionDescription` | | `string` | `"payment transaction at Batz, Lowe and Hyatt using card ending with ***1236 for HUF 70.61 in account ***74200311",`
| `asFinanceTransactionType` | | `string` | `"deposit"`
| `asFirstName` | `Gender?: 'male' \| 'female' \| 'm' \| 'f'` | `string` | `"Oswaldo"`
| `asFloat` | `Max?: number` | `number` | `30751.39`
| `asFloatRange` | `Min?: number` <br> `Max?: number` <br> `Precision?: number` | `number` | `69423.14`
| `asGender` | | `string` | `"Trans Female"`
| `asGenre` | | `string` | `"Pop"`
| `asGitBranch` | | `string` | `"feed-quantify"`
| `asGitCommitEntry` | `Merge?: boolean = false` | `string` | `"commit 1ba59e0b835d2b870364e1d6da03770a1eb96d7b\r\nAuthor: Angus Keelin <Ron69@yahoo.com>\r\nDate: Thu Mar 25 2021 10:15:00 GMT-0700 (Pacific Daylight Time)\r\n\r\n    parse open-source application\r\n",`
| `asGitCommitMessage` | | `string` | `"hack primary interface"`
| `asGitCommitSha` | | `string` | `"5f80887d406c9748ad1ec07a8b9815ff5cf9593c"`
| `asGitShortSha` | | `string` | `"0068808"`
| `asHackerAbbreviation` | | `string` | `"AI"`
| `asHackerAdjective` | | `string` | `"open-source"`
| `asHackerNoun` | | `string` | `"application"`
| `asHackerPhrase` | | `string` | `"We need to reboot the mobile FTP driver!"`
| `asHackerVerb` | | `string` | `"copy"`
| `asHackingVerb` | | `string` | `"hacking"`
| `asHexaDecimal` | `Count?: number` | `string` | `"0xa"`
| `asImage` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/nightlife"`
| `asImageAbstract` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/abstract"`
| `asImageAnimal` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/animals"`
| `asImageBusiness` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/business"`
| `asImageCats` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/cats"`
| `asImageCity` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/city"`
| `asImageDataUri` | `Width?: number = 640` <br> `Height?: number = 480` <br> `Color?: string` | `string` | `"data:image/svg+xm;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",`
| `asImageFashion` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/fashion"`
| `asImageFood` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/food"`
| `asImageNature` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/nature"`
| `asImageNightlife` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/nightlife"`
| `asImagePeople` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/people"`
| `asImageSports` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/sports"`
| `asImageTechnics` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/technics"`
| `asImageTransport` | `Width?: number = 640` <br> `Height?: number = 480` | `string` | `"http://placeimg.com/640/480/transport"`
| `asImageUrl` | `Width?: number = 640` <br> `Height?: number = 480` <br> `Category?: string` <br> `Randomize?: boolean` <br> `Https? boolean = false` | `string` | `"http://placeimg.com/640/480",`
| `asInternetAvatar` | | `string` | `"https://s3.amazonaws.com/uifaces/faces/twitter/cbracco/128.jpg"`
| `asIP` | | `string` | `"153.152.29.108"`
| `asIPv6` | | `string` | `"04fb:cca8:bc84:bbde:16bd:5086:c285:09b3"`
| `asJobArea` | | `string` | `"Usability"`
| `asJobDescriptor` | | `string` | `"Forward"`
| `asJobTitle` | | `string` | `"Human Operations Manager"`
| `asJobType` | | `string` | `"Engineer"`
| `asJSON` | | `string` | `"{\n  \"firstName\": \"Lee\",\n  \"lastName\": \"Boyle\",\n  \"age\": 23\n}"`
| `asLastName` | `Gender?: 'male' \| 'female' \| 'm' \| 'f'` | `string` | `"Koelpin"`
| `asLatitude` | `Max?: number` <br> `Min?: number` | `string` | `"-36.3442"`
| `asLocale` | | `string` | `"pt_PT"`
| `asLongitude` | `Max?: number` <br> `Min?: number` | `string` | `"92.0341"`
| `asLoremLines` | `LineCount?: number` | `string` | `"Hic ut ut ad quia non.\nQuia molestiae iste minima quia ut.\nAut amet vero ea ist cumque quo ducimus aut.\nQuia ipsam quia explicabo doloribus dolor dolores expedita odit.\nAssumenda aperiam inventore.",`
| `asLoremParagraph` | `SentenceCount?: number` | `string` | `"Expedita non nemo ut at dolores sint distinctio minus reprehenderit Voluptate sunt et nam voluptas fugit porro. Est ullam quis magnam et. Ratione aut ea. A sed quia facere voluptatibus praesentium.",`
| `asLoremParagraphs` | `ParagraphCount?: number` | `string` | `"Et qui recusandae blanditiis error officia. Dolor voluptas sapient voluptas fugiat enim tempore. Velit quae et. Accusantium aspernatur at cupiditate. Atque sit expedita. Est explicabo in rerum eos quia pariatur harum quia.\n \rConsequuntur harum et sint aliquam est harum aperiam est minima. Voluptatibus harum qui ipsum debitis animi quis soluta qui. Tenetur ut dolorum non et aliquid. Tempore accusantium non quos voluptatem sunt ut quia corrupti. Perferendis labore sed consequatur eum quo. Pariatur illo in molestias optio excepturi.\n \rIllum iste reprehenderit rerum temporibus voluptatem cumque aliquid minus. Officia quod id consectetur saepe facilis. Porro cum quis sed. Nihil quam non vitae error.",`
| `asLoremSentence` | `WordCount?: number` | `string` | `"Sunt dolorem illo dolore labore voluptate ut est quis."`
| `asLoremSentences` | `SentenceCount?: number` | `string` | `"Et est iste dolorum perspiciatis voluptas quisquam. Magnam reru necessitatibus ut nobis perferendis non nihil aut. Quisquam dolores repudiandae saepe nisi. Qui odit sed ad maxime. Pariatur consequatur nihil sint aut. Rerum nihil nemo molestiae.",`
| `asLoremSlug` | `WordCount?: number` | `string` | `"et-vel-tempore"`
| `asLoremText` | `Times?: number` | `string` | `"Ducimus in enim necessitatibus et ea ipsa omnis aperiam vel. Accusantium quisquam se velit doloremque aspernatur aut et maxime. Odit rem eius labore esse qui id sunt. Facere mollitia praesentium fugit. Labore molestiae consequuntur eos animi.",`
| `asLoremWord` | `Length?: number` | `string` | `"architecto"`
| `asLoremWords` | `WordCount?: number` | `string` | `"velit impedit minima"`
| `asMAC` | | `string` | `"65:68:a3:c3:04:bf"`
| `asMiddleName` | | `string` | `"b"`
| `asMimeType` | | `string` | `"application/vnd.ms-office.activex+xml"`
| `asMonth` | `Abbreviate?: boolean = false` | `string` | `"October"`
| `asNearbyGPSCoordinate` | | `[string, string]` | `["-63.8772", "-59.3663"]`
| `asNumber` | `Max?: number` | `number` | `1904`
| `asNumberRange` | `Min?: number` <bar> `Max?: number` `Precision?: number` | `number` | `62370`
| `asOrdinalDirection` | | `string` | `"Southeast"`
| `asPassword` | `Length?: number` <br> `Memorable?: boolean` <br> `Pattern?: string` <br> `Prefix?: number` | `string` | `"I8MT5BvdDHh92d_"`
| `asPhoneFormats` | | `string` | `"!##.!##.#### x####"`
| `asPhoneNumber` | `Format?: string` | `string` | `"(766) 627-9742"`
| `asPhoneNumberFormat` | `PhoneFormatsArrayIndex?: number` | `string` | `"758-900-3026"`
| `asPrefix` | | `string` | `"Mr."`
| `asPrice` | `Min?: number` <br> `Max?: number` <br> `Dec?: number` <br> `Symbol?: string` | `string` | `"287.00"`
| `asProduct` | | `string` | `"Mouse"`
| `asProductAdjective` | | `string` | `"Refined"`
| `asProductDescription` | | `string` | `"New range of formal shirts are designed keeping you in mind. With fits and styling that will mak you stand apart",`
| `asProductMaterial` | | `string` | `"Rubber"`
| `asProductName` | | `string` | `"Unbranded Plastic Towels"`
| `asProtocol` | | `string` | `"http"`
| `asRGB` | `Red?: number` <br> `Green?: number` <br> `Blue?: number` | `string` | `"#117846"`
| `asRoutingNumber` | | `string` | `"698889345"`
| `asSecondaryAddress` | | `string` | `"Suite 819"`
| `asSemVer` | | `string` | `"6.0.5"`
| `asState` | `UseAbbr?: boolean = false` | `string` | `"Ohio"`
| `asStateAbbr` | | `string` | `"HI"`
| `asStreetAddress` | `UseFullAddress?: boolean = false` | `string` | `"169 Stark Stream"`
| `asStreetName` | | `string` | `"Mosciski Fork"`
| `asStreetPrefix` | | `string` | `"b"`
| `asStreetSuffix` | | `string` | `"Court"`
| `asSuffix` | | `string` | `"III"`
| `asTime` | `Kind?: 'abbr' \| 'wide' = 'abbr'` | `string` | `"11:51:05 PM"`
| `asTimeZone` | | `string` | `"Pacific/Fiji"`
| `asTitle` | | `string` | `"Central Group Orchestrator"`
| `asUnixTime` | | `number` | `1616741465160`
| `asUrl` | | `string` | `"http://lenore.biz"`
| `asUserAgent` | | `string` | `"Mozilla/5.0 (Windows; U; Windows NT 6.3) AppleWebKit/533.0.1 (KHTML, like Gecko) Chrome/36.0.843.0 Safar/533.0.1",`
| `asUserName` | `FirstName?: string` <br> `LastName?: string` | `string` | `"Rhiannon82"`
| `asUUID` | | `string` | `"62f2c68e-826a-4b1e-994c-1284c6d4c3d8"`
| `asVehicle` | | `string` | `"Kia LeBaron"`
| `asVehicleColor` | | `string` | `"fuchsia"`
| `asVehicleFuel` | | `string` | `"Hybrid"`
| `asVehicleManufacturer` | | `string` | `"Kia"`
| `asVehicleModel` | | `string` | `"Countach"`
| `asVehicleType` | | `string` | `"SUV"`
| `asVehicleVIN` | | `string` | `"T06P0XJUZHLW99828"`
| `asWeekday` | `Abbreviate?: string` | `string` | `"Sunday"`
| `asWord` | `Type?: string` | `string` | `"Bike"`
| `asWords` | `Count?: number` | `string` | `"deposit sexy transmit"`
| `asZipCode` | | `string` | `"08324"`
| `asZipCodeByState` | `State?: string` | `string` | `"66048-1664"`
