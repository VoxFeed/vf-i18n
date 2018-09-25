const DATE_FORMATS = {
  short: 'L',
  medium: 'll',
  long: 'LL',
  full: 'LLLL'
};

const DATETIME_FORMATS = {
  short: 'L LT',
  medium: 'lll',
  long: 'LLL',
  full: 'LLLL'
};

const TIME_FORMATS = {
  short: 'LT',
  medium: 'LTS',
  long: 'LTS',
  full: 'LTS Z'
};

module.exports = {
  DATE_FORMATS,
  DATETIME_FORMATS,
  TIME_FORMATS
};
