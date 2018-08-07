const moment = require('moment-timezone');
const {validateFormat} = require('./utils');
const {DATE_FORMATS} = require('./config/formats');
const DEFAULT_TIME_FORMAT = 'LT';

const removeTimeFromDateString = (date, formattedDate) => formattedDate.replace(moment(date).format(DEFAULT_TIME_FORMAT), '');

function getDate(locale, date, format, timezone) {
  validateFormat('date', format, Object.keys(DATE_FORMATS));

  const formatConfig = DATE_FORMATS[format];
  const newDate = timezone ? moment(date).tz(timezone) : moment(date);

  newDate.locale(locale);

  const formattedDate = newDate.format(formatConfig);

  return removeTimeFromDateString(newDate, formattedDate).trim();
}

module.exports = getDate;
