const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getNumber', () => {
  it('should return an integer if decimals not specified', () => {
    const number = 1.9999;

    const string = i18n.getNumber('es', number);
    expect(string).to.be.equal('2');
  });

  it('should fix number of decimals if specified', () => {
    const number = 1;

    const string = i18n.getNumber('es', number, 4);
    expect(string).to.be.equal('1.0000');
  });

  it('should separate thousands', () => {
    const number = 1234567.89;

    const string = i18n.getNumber('es', number, 4);
    expect(string).to.be.equal('1,234,567.8900');
  });
});
