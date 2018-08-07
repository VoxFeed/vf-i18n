const areIntlLocalesSupported = require('intl-locales-supported');

module.exports = (supportedLocales) => {
  /*for (const locale of supportedLocales) {
    require(`moment/locale/${locale}`);
  }*/

  if (!global.Intl) global.Intl = require('intl');

  if (!areIntlLocalesSupported(supportedLocales)) {
    const IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }

  return global.Intl;
};
