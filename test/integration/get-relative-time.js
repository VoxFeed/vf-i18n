const moment = require('moment-timezone');
const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getRelativeTime', () => {
  it('should relative time in the past', () => {
    const date = moment().subtract(1, 'day').toDate();

    const stringEs = i18n.getRelativeTime('es', date);
    expect(stringEs).to.be.equal('ayer');

    const stringEn = i18n.getRelativeTime('en', date);
    expect(stringEn).to.be.equal('yesterday');
  });

  it('should relative time in the future', () => {
    const date = moment().add(1, 'day').toDate();

    const stringEs = i18n.getRelativeTime('es', date);
    expect(stringEs).to.be.equal('mañana');

    const stringEn = i18n.getRelativeTime('en', date);
    expect(stringEn).to.be.equal('tomorrow');
  });

  it('can be forced to express time in numeric unit', () => {
    const date = moment().add(1, 'day').toDate();
    const style = 'numeric';

    const stringEs = i18n.getRelativeTime('es', date, style);
    expect(stringEs).to.be.equal('dentro de 1 día');

    const stringEn = i18n.getRelativeTime('en', date, style);
    expect(stringEn).to.be.equal('in 1 day');
  });

  it('can be forced to express time in other unit', () => {
    const date = moment().add(1, 'day').toDate();
    const style = 'numeric';
    const unit = 'hour';

    const stringEs = i18n.getRelativeTime('es', date, style, unit);
    expect(stringEs).to.be.equal('dentro de 24 horas');

    const stringEn = i18n.getRelativeTime('en', date, style, unit);
    expect(stringEn).to.be.equal('in 24 hours');
  });

  it('can be forced to express time in other unit', () => {
    const date = moment().add(1, 'day').toDate();
    const style = 'numeric';
    const unit = 'hour';

    const stringEs = i18n.getRelativeTime('es', date, style, unit);
    expect(stringEs).to.be.equal('dentro de 24 horas');

    const stringEn = i18n.getRelativeTime('en', date, style, unit);
    expect(stringEn).to.be.equal('in 24 hours');
  });

  it('shoud accept other date to calculate relative time', () => {
    const date = moment().add(1, 'day').toDate();
    const fromDate = moment().subtract(2, 'day').toDate();
    const style = 'numeric';
    const unit = 'day';

    const stringEs = i18n.getRelativeTime('es', date, style, unit, fromDate);
    expect(stringEs).to.be.equal('dentro de 3 días');

    const stringEn = i18n.getRelativeTime('en', date, style, unit, fromDate);
    expect(stringEn).to.be.equal('in 3 days');
  });
});
