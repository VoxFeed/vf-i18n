const MessageFormat = require('messageformat');
const isNil = require('lodash.isnil');
const getProperty = require('lodash.get');
const isString = require('lodash.isstring');
const getDate = require('./get-date');
const getMoney = require('./get-money');
const getNumber = require('./get-number');
const getTime = require('./get-time');

const DEFAULT_STRING = '';

function get(locale, key, data) {
  const {onMissingString, strings, fallbackLocales} = this;
  const timezone = getProperty(data, 'timezone');

  const execute = () => {
    const value = getValue(locale, key, data);

    if (!isNil(value)) return value;

    const fallbackValue = fallbackLocales.reduce((response, fbLocale) => {
      if (!isNil(response)) return response;
      return getValue(fbLocale, key, data);
    }, null);

    if (!isNil(fallbackValue)) return fallbackValue;

    if (onMissingString) onMissingString({locale, key});
    return DEFAULT_STRING;
  };

  const getValue = (locale, key, data) => {
    const value = getProperty(strings, `${locale}.${key}`);
    return isNil(value) ? null : formatValue(value, data);
  };

  const formatValue = (value, data) => {
    const formatter = isString(value) ? formatSingleValue : formatMultipleValues;
    return formatter(value, data);
  };

  const formatMultipleValues = (value, data) => value.map(item => formatSingleValue(item, data));

  const formatSingleValue = (value, data) => {
    const formater = getFormatter();
    const formatMessage = formater.compile(value);

    return formatMessage(data);
  };

  const getFormatter = () => {
    const formater = new MessageFormat(locale);
    const customFormats = getCustomFormats();

    formater.addFormatters(customFormats);

    return formater;
  };

  const getCustomFormats = () => {
    return {
      number: (value, locale) => getNumber(locale, value),
      decimal: (value, locale, decimals) => getNumber(locale, value, decimals),
      currency: (value, locale, currency) => getMoney(locale, value, currency),
      date: (value, locale, format) => getDate(locale, value, format, timezone),
      time: (value, locale, format) => getTime(locale, value, format, timezone)
    };
  };

  return execute();
}

module.exports = get;
