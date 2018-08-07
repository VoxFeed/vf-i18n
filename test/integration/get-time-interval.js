const moment = require('moment-timezone');
const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getTimeInterval', () => {
  it('should get duration in the past (1 day)', () => {
    const date = moment().subtract(1, 'day').toDate();

    const stringEs = i18n.getTimeInterval('es', date);
    expect(stringEs).to.be.equal('un día');

    const stringEn = i18n.getTimeInterval('en', date);
    expect(stringEn).to.be.equal('a day');
  });

  it('should get duration time in the future (1 day)', () => {
    const date = moment().add(1, 'day').toDate();

    const stringEs = i18n.getTimeInterval('es', date);
    expect(stringEs).to.be.equal('un día');

    const stringEn = i18n.getTimeInterval('en', date);
    expect(stringEn).to.be.equal('a day');
  });

  it('should get duration in the past (5 hours)', () => {
    const date = moment().subtract(5, 'hours').toDate();

    const stringEs = i18n.getTimeInterval('es', date);
    expect(stringEs).to.be.equal('5 horas');

    const stringEn = i18n.getTimeInterval('en', date);
    expect(stringEn).to.be.equal('5 hours');
  });

  it('should get duration time in the future (5 hours)', () => {
    const date = moment().add(5, 'hours').toDate();

    const stringEs = i18n.getTimeInterval('es', date);
    expect(stringEs).to.be.equal('5 horas');

    const stringEn = i18n.getTimeInterval('en', date);
    expect(stringEn).to.be.equal('5 hours');
  });

  it('shoud accept other date to calculate duration', () => {
    const date = moment().add(1, 'day').toDate();
    const fromDate = moment().subtract(2, 'day').toDate();

    const stringEs = i18n.getTimeInterval('es', date, fromDate);
    expect(stringEs).to.be.equal('3 días');

    const stringEn = i18n.getTimeInterval('en', date, fromDate);
    expect(stringEn).to.be.equal('3 days');
  });
});
