const moment = require('moment');

function getDuration(locale, durationInMs) {
  return moment.duration(durationInMs, 'ms').locale(locale).humanize();
}

module.exports = getDuration;
