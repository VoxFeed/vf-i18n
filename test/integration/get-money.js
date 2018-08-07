const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getMoney', () => {
  it('should use always 2 decimals', () => {
    const currency = 'usd';

    const string1 = i18n.getMoney('es', 1, currency);
    expect(string1).to.be.equal('$1.00 USD');

    const string2 = i18n.getMoney('es', 1.2345, currency);
    expect(string2).to.be.equal('$1.23 USD');
  });

  it('should accept multiple currencies', () => {
    const value = 1;
    const currency = 'eur';

    const string = i18n.getMoney('es', value, currency);
    expect(string).to.be.equal('€1.00 EUR');
  });
});
