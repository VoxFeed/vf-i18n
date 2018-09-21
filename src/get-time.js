const moment = require('moment');
const momentTz = require('moment-timezone');
const {getTimeLocale, validateFormat} = require('./utils');
const {TIME_FORMATS} = require('./config/formats');

function getTime(locale, dateTime, format, timezone) {
  validateFormat('time', format, Object.keys(TIME_FORMATS));

  const timeLocale = getTimeLocale(locale);
  const timeFormat = TIME_FORMATS[format];
  const timeTz = timezone ? moment(momentTz(dateTime).tz(timezone)) : moment(dateTime);

  timeTz.locale(timeLocale);

  const timeStr = timeTz.format(timeFormat);
  return timeStr.trim();
}

module.exports = getTime;
