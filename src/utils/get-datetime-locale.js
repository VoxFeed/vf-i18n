const {DATETIME_LOCALES} = require('../config/locales-overwrite');

module.exports = (locale) => {
  return DATETIME_LOCALES[locale] || locale;
};
