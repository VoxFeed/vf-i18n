const {isArray, isPlainObject} = require('lodash');
const buildIntl = require('./build-intl');
const getDate = require('./get-date');
const getDuration = require('./get-duration');
const getMoney = require('./get-money');
const getNumber = require('./get-number');
const getRelativeTime = require('./get-relative-time');
const getTimeInterval = require('./get-time-interval');
const getTime = require('./get-time');
const get = require('./get');

const VFi18n = class {
  constructor(params = {}) {
    validateParameters(params);
    this.strings = params.strings;
    this.fallbackLocales = params.fallbackLocales || [];
    this.onMissingString = params.onMissingString || null;
    this.validLocales = getValidLocales(this.strings);
    this.Intl = buildIntl(this.validLocales);
  }

  validateLocale(locale) {
    if (!this.validLocales.includes(locale)) throw new Error(`Locale "${locale}" is not valid.`);
  }

  get(...args) {
    return get.call(this, ...args);
  }

  getDate(...args) {
    return getDate.call(this, ...args);
  }

  getDuration(...args) {
    return getDuration.call(this, ...args);
  }

  getMoney(...args) {
    return getMoney.call(this, ...args);
  }

  getNumber(...args) {
    return getNumber.call(this, ...args);
  }

  getRelativeTime(...args) {
    return getRelativeTime.call(this, ...args);
  }

  getTimeInterval(...args) {
    return getTimeInterval.call(this, ...args);
  }

  getTime(...args) {
    return getTime.call(this, ...args);
  }
};

module.exports = VFi18n;

function getValidLocales(strings = {}) {
  return Object.keys(strings);
}

function validateParameters(params) {
  const {strings, fallbackLocales} = params;
  if (strings && !isPlainObject(strings)) throw new Error(`Parameter "strings" must be a plain object. Got: ${strings}`);
  if (fallbackLocales && !isArray(fallbackLocales)) throw new Error(`Parameter "fallbackLocales" must be an array. Got: ${fallbackLocales}`);
}
