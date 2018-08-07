# VF i18n

i18n utilities for [VoxFeed](https://voxfeed.com)

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
|`strings`|Object|An object containing all the translations available, grouped by each supported locale.|
|`onMissingString`|Function|A function that is called everytime a requested translation is not available in `strings` for a given `locale`. An object with `locale` and `key` is passed on each call.|
|`fallbackLocales`|Array[String]|If a translation is not available in a specific `locale`, then if `fallbackLocales` are specified the library will try to find a translation in one of those locales (from first to last). First translation available is returned.|

Example:

```javascript
const VFi18n = require('vf-i18n');

const strings = {
  en: {
    GREETING: 'Hello!',
    THANKS: 'Thank you',
    BYE: 'Good bye!'
  },
  es: {
    GREETING: '¡Hola!',
    THANKS: 'Gracias'
  },
  de: {
    GREETING: 'Hallo!',
    THANKS: 'Danke'
  },
  it: {
    GREETING: 'Ciao!',
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

i18n.get('es', 'GREETING'); // Will return "¡Hola!"

i18n.get('it', 'BYE'); // Will call onMissingString({locale: 'it', key: 'BYE'}) and return "Good bye!" (fallback).
```

## API

Once instantiated, the library exposes the following API:

### .get(locale, key, data)

Returns a translation string for a given `locale` and `key` combination. It uses [messageformat](http://messageformat.github.io/) internally, so every formatting option supported by messageformat (plurals, categories, variables...) is also supported by this function.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`locale`|String|*Required.* The locale in which the translation is required.|
|`key`|String|*Required.* The key identifying the string to be translated.|
|`data`|Object|Options and variables to be passed to the formatter.|

Example:
```javascript
const VFi18n = require('vf-i18n');

const strings = {
  en: {
    GREETING: 'Hello {name}!'
  },
  es: {
    GREETING: '¡Hola {name}!'
  }
};

const i18n = new VFi18n({
  strings
});

i18n.get('es', 'GREETING', {name: 'Morty'}); // Will return "¡Hola Morty!"
```

## License

MIT
