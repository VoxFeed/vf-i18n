const {getNumberLocale} = require('./utils');

function getNumber(locale, amount, decimals) {
  const {Intl} = this;
  const options = {
    useGrouping: true,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  };
  const numbersLocale = getNumberLocale(locale);
  return new Intl.NumberFormat(numbersLocale, options).format(amount);
}

module.exports = getNumber;
