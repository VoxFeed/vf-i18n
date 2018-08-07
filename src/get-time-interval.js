const getDuration = require('./get-duration');

function getTimeInterval(locale, date, fromDate = new Date()) {
  const timeDiff = date.getTime() - fromDate.getTime();
  const duration = Math.abs(timeDiff);
  return getDuration(locale, duration);
}

module.exports = getTimeInterval;
