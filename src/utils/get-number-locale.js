const {NUMBER_LOCALES} = require('../config/locales-overwrite');

module.exports = (locale) => {
  return NUMBER_LOCALES[locale] || locale;
};
