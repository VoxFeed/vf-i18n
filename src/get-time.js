const moment = require('moment-timezone');
const {getTimeLocale, validateFormat} = require('./utils');
const {TIME_FORMATS} = require('./config/formats');

function getTime(locale, dateTime, format, timezone) {
  validateFormat('time', format, Object.keys(TIME_FORMATS));

  const timeLocale = getTimeLocale(locale);
  const timeFormat = TIME_FORMATS[format];
  const zonedTime = timezone ? moment(dateTime).tz(timezone) : moment(dateTime);

  zonedTime.locale(timeLocale);

  const time = zonedTime.format(timeFormat);
  return time.trim();
}

module.exports = getTime;
