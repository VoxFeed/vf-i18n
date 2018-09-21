const moment = require('moment-timezone');
const {getDateTimeLocale, validateFormat} = require('./utils');
const {DATETIME_FORMATS} = require('./config/formats');

function getTime(locale, dateTime, format, timezone) {
  validateFormat('datetime', format, Object.keys(DATETIME_FORMATS));

  const dateTimeLocale = getDateTimeLocale(locale);
  const dateTimeFormat = DATETIME_FORMATS[format];
  const timeTz = timezone ? moment(dateTime).tz(timezone) : moment(dateTime);

  timeTz.locale(dateTimeLocale);

  return timeTz.format(dateTimeFormat);
}

module.exports = getTime;
