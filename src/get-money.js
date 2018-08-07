const {getNumberLocale} = require('./utils');

function getMoney(locale, amount, currency) {
  const {Intl} = this;
  const options = {
    currency,
    style: 'currency',
    useGrouping: true,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  const numbersLocale = getNumberLocale(locale);
  const amountStr = new Intl.NumberFormat(numbersLocale, options).format(amount);
  return `${amountStr} ${currency.toUpperCase()}`;
}

module.exports = getMoney;
