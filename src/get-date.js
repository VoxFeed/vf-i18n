const moment = require('moment-timezone');
const {validateFormat} = require('./utils');
const {DATE_FORMATS} = require('./config/formats');
const DEFAULT_TIME_FORMAT = 'LT';

const removeTimeFromDateString = (formattedDate, date, locale) => formattedDate.replace(date.locale(locale).format(DEFAULT_TIME_FORMAT), '');

function getDate(locale, date, format, timezone) {
  validateFormat('date', format, Object.keys(DATE_FORMATS));

  const formatConfig = DATE_FORMATS[format];
  const dateTz = timezone ? moment(date).tz(timezone) : moment(date);

  const formattedDate = dateTz
    .locale(locale)
    .format(formatConfig);

  return removeTimeFromDateString(formattedDate, dateTz, locale).trim();
}

module.exports = getDate;
