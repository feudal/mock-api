const DatatypeModule = [
  "number",
  "float",
  "arrayElement",
  "objectElement",
  "uuid",
  "boolean",
  "word",
  "words",
  "image",
  "locale",
  "alpha",
  "alphaNumeric",
  "hexaDecimal",
  "array",
  "random",
  "hexaDecimal",
  "json",
  "bigInt",
  "number",
  "float",
  "arrayElement",
  "objectElement",
  "uuid",
  "boolean",
  "word",
  "words",
  "image",
  "locale",
  "alpha",
  "alphaNumeric",
  "hexaDecimal",
  "array",
  "random",
  "hexaDecimal",
  "json",
  "bigInt",
];
const RandomModule = [
  "word",
  "words",
  "locale",
  "alpha",
  "alphaNumeric",
  "numeric",
];

const AddressModule = [
  "zipCode",
  "city",
  "cityPrefix",
  "citySuffix",
  "streetName",
  "streetAddress",
  "streetSuffix",
  "streetPrefix",
  "secondaryAddress",
  "county",
  "country",
  "countryCode",
  "state",
  "stateAbbr",
  "latitude",
  "longitude",
];

const AnimalModule = [
  "dog",
  "cat",
  "snake",
  "bear",
  "lion",
  "cetacean",
  "horse",
  "bird",
  "cow",
  "fish",
  "crocodilia",
  "insect",
  "rabbit",
  "rodent",
  "type",
];

const ColorModule = [
  "colorName",
  "hexaDecimal",
  "rgbArray",
  "rgbDecimal",
  "rgbPercent",
  "hslArray",
  "hslPercent",
  "hsvArray",
  "hsvPercent",
  "hwbArray",
  "hwbPercent",
  "cmykArray",
  "cmykPercent",
  "xyzArray",
  "labArray",
  "lchArray",
  "hexaCompressed",
  "keyword",
  "random",
];

const CommerceModule = [
  "color",
  "department",
  "productName",
  "price",
  "productAdjective",
  "productMaterial",
  "product",
  "productDescription",
];

const CompanyModule = [
  "suffixes",
  "name",
  "companyName",
  "companySuffix",
  "catchPhrase",
  "bs",
  "catchPhraseAdjective",
  "catchPhraseDescriptor",
  "catchPhraseNoun",
  "bsAdjective",
  "bsBuzz",
  "bsNoun",
];

const DatabaseModule = [
  "column",
  "type",
  "collation",
  "engine",
  "mongodbObjectId",
];

const DateModule = [
  "past",
  "future",
  "between",
  "recent",
  "soon",
  "month",
  "weekday",
  "birthdate",
];

const FinanceModule = [
  "account",
  "accountName",
  "mask",
  "amount",
  "transactionType",
  "currencyCode",
  "currencyName",
  "currencySymbol",
  "bitcoinAddress",
  "litecoinAddress",
  "creditCardNumber",
  "creditCardCVV",
  "pin",
  "ethereumAddress",
  "iban",
  "bic",
  "transactionDescription",
];

const GitModule = [
  "branch",
  "commitEntry",
  "commitMessage",
  "commitSha",
  "shortSha",
];

const HackerModule = [
  "abbreviation",
  "adjective",
  "noun",
  "verb",
  "ingverb",
  "phrase",
];

const ImageModule = [
  "image",
  "avatar",
  "imageUrl",
  "abstract",
  "animals",
  "business",
  "cats",
  "city",
  "food",
  "nightlife",
  "fashion",
  "people",
  "nature",
  "sports",
  "technics",
  "transport",
  "dataUri",
];

const InternetModule = [
  "avatar",
  "email",
  "exampleEmail",
  "userName",
  "protocol",
  "url",
  "domainName",
  "domainSuffix",
  "domainWord",
  "ip",
  "ipv6",
  "userAgent",
  "color",
  "mac",
  "password",
  "emoji",
];

const LoremModule = [
  "word",
  "words",
  "sentence",
  "slug",
  "sentences",
  "paragraph",
  "paragraphs",
  "text",
  "lines",
];

const MusicModule = ["genre", "songName"];

const NameModule = [
  "firstName",
  "lastName",
  "findName",
  "jobTitle",
  "prefix",
  "suffix",
  "title",
  "jobDescriptor",
  "jobArea",
  "jobType",
];

const PhoneModule = [
  "phoneNumber",
  "phoneNumberFormat",
  "phoneFormats",
  "imei",
];

const ScienceModule = ["scientificName", "chemicalElement", "unit"];

const SystemModule = [
  "fileName",
  "commonFileName",
  "mimeType",
  "commonFileType",
  "commonFileExt",
  "fileType",
  "fileExt",
  "directoryPath",
  "filePath",
  "semver",
  "cron",
];

const VehicleModule = ["vin", "color", "vrm", "bicycle"];

const WordModule = [
  "word",
  "words",
  "sentence",
  "slug",
  "sentences",
  "paragraph",
  "paragraphs",
  "text",
  "lines",
];

export const fakerOptions: { [key: string]: string[] } = {
  datatype: DatatypeModule,
  random: RandomModule,
  address: AddressModule,
  animal: AnimalModule,
  color: ColorModule,
  commerce: CommerceModule,
  company: CompanyModule,
  database: DatabaseModule,
  date: DateModule,
  finance: FinanceModule,
  git: GitModule,
  hacker: HackerModule,
  image: ImageModule,
  internet: InternetModule,
  lorem: LoremModule,
  music: MusicModule,
  name: NameModule,
  phone: PhoneModule,
  science: ScienceModule,
  system: SystemModule,
  vehicle: VehicleModule,
  word: WordModule,
};

export const fakerOptionsKeys = [
  "enum",
  "interface",
  "array-of-interface",
  ...Object.keys(fakerOptions),
];
