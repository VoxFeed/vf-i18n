const VFi18n = require('../../src');
const i18n = new VFi18n();

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

describe('i18n.getDuration', () => {
  it('should get duration of 5 hours', () => {
    const duration = 5 * ONE_HOUR;

    const stringEs = i18n.getDuration('es', duration);
    expect(stringEs).to.be.equal('5 horas');

    const stringEn = i18n.getDuration('en', duration);
    expect(stringEn).to.be.equal('5 hours');
  });

  it('should get duration of 1 day', () => {
    const duration = ONE_DAY;

    const stringEs = i18n.getDuration('es', duration);
    expect(stringEs).to.be.equal('un día');

    const stringEn = i18n.getDuration('en', duration);
    expect(stringEn).to.be.equal('a day');
  });
});
