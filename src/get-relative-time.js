const IntlRelativeFormat = require('intl-relativeformat');

function getRelativeTime(locale, date, style, units, fromDate) {
  const options = {};
  const formatOptions = {};

  if (style) Object.assign(options, {style});
  if (units) Object.assign(options, {units});
  if (fromDate) Object.assign(formatOptions, {now: fromDate.getTime()});

  const formater = new IntlRelativeFormat(locale, options);
  return formater.format(date, formatOptions);
}

module.exports = getRelativeTime;
