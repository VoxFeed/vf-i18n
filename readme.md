# VF i18n

![](https://img.shields.io/badge/node-%3E%3D%208.0.0-green.svg?style=flat)
![](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)

Internationalization utilities used in [VoxFeed](https://voxfeed.com).

## Install

```bash
yarn add vf-i18n
```

or

```bash
npm install --save vf-i18n
```

## Usage

Require the module in your project and instantiate a i18n class.

```javascript
const VFi18n = require('vf-i18n');
const i18n = new VFi18n();
```

Optionally you can pass the following parameters to the constructor:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `strings` | Object | An object containing all the translations available, grouped by each supported locale. |
| `onMissingString` | Function | A function that is called everytime a requested translation is not available in `strings` for a given `locale`. An object with `locale` and `key` is passed on each call. |
| `fallbackLocales` | Array[String] | If a translation is not available in a specific `locale`, then if `fallbackLocales` are specified the library will try to find a translation in one of those locales (from first to last). First translation available is returned. |

*Example:*
```javascript
const VFi18n = require('vf-i18n');

const strings = {
  en: {
    GREETING: 'Hello {name}!',
    THANKS: 'Thank you',
    BYE: 'Good bye!'
  },
  es: {
    GREETING: '¡Hola {name}!',
    THANKS: 'Gracias'
  },
  de: {
    GREETING: 'Hallo {name}!',
    THANKS: 'Danke'
  },
  it: {
    GREETING: 'Ciao {name}!',
    THANKS: 'Grazie'
  }
};

const fallbackLocales = ['en']; // If not found in specified locale, will fallback to English.

const onMissingString = ({locale, key}) => {
  console.log(`String not found for locale "${locale}" and key "${key}"`);
};

const i18n = new VFi18n({
  strings,
  fallbackLocales,
  onMissingString
});

i18n.get('es', 'THANKS'); // Gracias

i18n.get('it', 'BYE'); // Will return "Good bye!" (fallback).

i18n.get('de', 'MISSING_KEY'); // Will call onMissingString({locale: 'de', key: 'MISSING_KEY'}) and return "" (default string).
```

## API

Once instantiated, the library exposes the following API:


### .get(locale, key, data)

Returns a translation string for a given `locale` and `key` combination. It uses [messageformat](http://messageformat.github.io/) internally, so every formatting option supported by messageformat (plurals, categories, variables...) is also supported by this function.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `key` | String | *Required.* The key identifying the string to be translated. |
| `data` | Object | Options and variables to be passed to the formatter. |

*Examples:*
```javascript
i18n.get('it', 'THANKS'); // Grazie
i18n.get('es', 'GREETING', {name: 'Morty'}); // ¡Hola Morty!
```


### .getDate(locale, date, format, timezone)

Returns a localized date string. It uses [Moment Localized formats](https://momentjs.com/docs/#/displaying/format/) internally, so available formats are mapped to one Moment format.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `date` | Date | *Required.* The date to be formatted. |
| `format` | String | *Required.* The style used to format the date string. Available formats are: `short`, `medium`, `long` and `full`. |
| `timezone` | String | Time zone name, used to convert the date prior to formatting. Defaults to UTC. |

*Formats:*

| Format | Moment Format | Example |
| ------ | ------------- | ------- |
| `short` | `L` | 10/14/2017 |
| `medium` | `ll` | Oct 14, 2017 |
| `long` | `LL` | October 14, 2017 |
| `full` | `LLLL` | Saturday, October 14, 2017 |

*Examples:*
```javascript
const date = new Date(2017, 9, 14);

i18n.getDate('en', date, 'short'); // 10/14/2017
i18n.getDate('en', date, 'long', 'America/Los_Angeles'); // 14 de octubre de 2017
```


### .getTime(locale, date, format, timezone)

Returns a localized time string. It uses [Moment Localized formats](https://momentjs.com/docs/#/displaying/format/) internally, so available formats are mapped to one Moment format.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `date` | Date | *Required.* The date to be formatted (only time is used). |
| `format` | String | *Required.* The style used to format the time. Available formats are: `short`, `medium`, `long` and `full`. |
| `timezone` | String | Time zone name, used to convert the time prior to formatting. Defaults to UTC. |

*Formats:*

| Format | Moment Format | Example |
| ------ | ------------- | ------- |
| `short` | `LT` | 6:30 PM |
| `medium` | `LTS` | 6:30:05 PM |
| `long` | `LTS` | 6:30:05 PM |
| `full` | `LTS z` | 6:30:05 PM CDT |

*Examples:*
```javascript
const date = new Date('2017-10-14T18:30:05.000Z');

i18n.getDate('en', date, 'short'); // 6:30:05 PM
i18n.getDate('en', date, 'long', 'Asia/Tokyo'); // 3:30:05 AM JST
```


### .getDateTime(locale, date, format, timezone)

Returns a localized date-time string. It uses [Moment Localized formats](https://momentjs.com/docs/#/displaying/format/) internally, so available formats are mapped to one Moment format.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `date` | Date | *Required.* The date-time to be formatted. |
| `format` | String | *Required.* The style used to format the date-time. Available formats are: `short`, `medium`, `long` and `full`. |
| `timezone` | String | Time zone name, used to convert the date-time prior to formatting. Defaults to UTC. |

*Formats:*

| Format | Moment Format | Example |
| ------ | ------------- | ------- |
| `short` | `L LT` | 10/14/2017 6:30 PM |
| `medium` | `lll` | Oct 14, 2017 6:30 PM |
| `long` | `LLL` | October 14, 2017 6:30 PM |
| `full` | `LLLL` | Sunday, October 15, 2017 3:30 AM |

*Examples:*
```javascript
const date = new Date('2017-10-14T18:30:05.000Z');

i18n.getDate('en', date, 'short'); // 6:30:05 PM
i18n.getDate('en', date, 'long', 'Asia/Tokyo'); // 3:30:05 AM JST
```


### .getDuration(locale, duration)

For a given time duration in milliseconds, returns a human-readable localized string. It uses [Moment Duration Humanize](https://momentjs.com/docs/#/durations/humanize/) internally.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `duration` | Integer | *Required.* Time duration in milliseconds. |

*Examples:*
```javascript
const ONE_HOUR = 60 * 60 * 1000;

i18n.getDuration('en', 5 * ONE_HOUR); // 5 hours
i18n.getDuration('en', 24 * ONE_HOUR); // a day
```


### .getRelativeTime(locale, date, style, units, fromDate)

For a given date, returns the distance in time from now (or other specific date) as a human-readable localized string. It uses [Yahoo's Intl RelativeFormat](https://github.com/yahoo/intl-relativeformat) internally.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `date` | Date | *Required.* The first date to calculate the distance in time. |
| `style` | String | Formatting style. Available styles are: `best fit` and `numeric` ([see more](https://github.com/yahoo/intl-relativeformat#style)). Defaults to `best fit`. |
| `units` | String | Whether to force the string to use a specific time unit. Available units are: `second`, `second-short`, `minute`, `minute-short`, `hour`, `hour-short`, `day`, `day-short`, `month`, `month-short`, `year` and `year-short` ([see more](https://github.com/yahoo/intl-relativeformat#units)). |
| `fromDate` | Date | The second date to calculate the distance in time. Defaults to `new Date()`. |

*Examples:*
```javascript
const ONE_DAY = 24 * 60 * 60 * 1000;
const date1 = new Date(Date.now() + ONE_DAY);
const date2 = new Date(Date.now() + 7 * ONE_DAY);

i18n.getRelativeTime('en', date1); // tomorrow
i18n.getRelativeTime('en', date1, 'numeric'); // in 1 day
i18n.getRelativeTime('en', date1, 'numeric', date2); // 6 days ago
```


### .getTimeInterval(locale, date, fromDate)

Returns a human-readable localized string for the duration between 2 dates. It uses `.getDuration` internally.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `date` | Date | *Required.* The first date to calculate the duration. |
| `fromDate` | Date | The second date to calculate the duration. Defaults to `new Date()`. |

*Examples:*
```javascript
const ONE_DAY = 24 * 60 * 60 * 1000;
const date1 = new Date(Date.now() + ONE_DAY); // Date in future
const date2 = new Date(Date.now() - ONE_DAY); // Date in past

i18n.getTimeInterval('en', date1); // a day
i18n.getTimeInterval('en', date2); // a day
i18n.getTimeInterval('en', date1, date2); // 2 days
```


### .getNumber(locale, amount, decimals)

It returns a formatted number string. It uses [Intl.NumberFormat](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/NumberFormat) internally.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `amount` | Number | *Required.* Number to be formatted. |
| `decimals` | Integer | Number of decimals. Defaults to 0. |

*Examples:*
```javascript
i18n.getNumber('en', 1234.56); // 1,235
i18n.getNumber('en', 1, 5); // 1.00000
```


### .getMoney(locale, amount, currency)

It returns a formatted currency string, always rounded to 2 decimals. It uses [Intl.NumberFormat](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/NumberFormat) internally.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `locale` | String | *Required.* The locale in which the translation is required. |
| `amount` | Number | *Required.* Money amount to be formatted. |
| `currency` | String | *Required.* Currency [ISO code](https://www.currency-iso.org/en/home/tables/table-a1.html) (Ej. USD, EUR). It is used to print the currency and choose its symbol ($, €...). |

*Examples:*
```javascript
i18n.getMoney('en', 10, 'MXN'); // $10.00 MXN
i18n.getMoney('en', 1200.059999, 'USD'); // $1,200.06 USD
```

## License

MIT
