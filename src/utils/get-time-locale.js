const {TIME_LOCALES} = require('../config/locales-overwrite');

module.exports = (locale) => {
  return TIME_LOCALES[locale] || locale;
};
