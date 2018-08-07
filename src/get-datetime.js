const moment = require('moment-timezone');
const {getDateTimeLocale, validateFormat} = require('./utils');
const {DATETIME_FORMATS} = require('./config/formats');

function getTime(locale, dateTime, format, timezone) {
  validateFormat('datetime', format, Object.keys(DATETIME_FORMATS));

  const dateTimeLocale = getDateTimeLocale(locale);
  const dateTimeFormat = DATETIME_FORMATS[format];
  const zonedTime = timezone ? moment(dateTime).tz(timezone) : moment(dateTime);

  zonedTime.locale(dateTimeLocale);

  return zonedTime.format(dateTimeFormat);
}

module.exports = getTime;
