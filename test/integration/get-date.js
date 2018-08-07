const moment = require('moment-timezone');
const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getDate', () => {
  it('should implement short format', () => {
    const format = 'short';
    const timezone = 'UTC';
    const date = moment('2017-10-14T00:00:00.000Z').tz(timezone).toDate();

    const string1 = i18n.getDate('es', date, format, timezone);
    expect(string1).to.be.equal('14/10/2017');

    const string2 = i18n.getDate('en', date, format, timezone);
    expect(string2).to.be.equal('10/14/2017');
  });

  it('should implement long format', () => {
    const format = 'long';
    const timezone = 'UTC';
    const date = moment('2017-10-14T00:00:00.000Z').tz(timezone).toDate();

    const string1 = i18n.getDate('es', date, format, timezone);
    expect(string1).to.be.equal('14 de octubre de 2017');

    const string2 = i18n.getDate('en', date, format, timezone);
    expect(string2).to.be.equal('October 14, 2017');
  });

  it('should implement full format', () => {
    const format = 'full';
    const timezone = 'UTC';
    const date = moment('2017-10-14T00:00:00.000Z').tz(timezone).toDate();

    const string1 = i18n.getDate('es', date, format, timezone);
    expect(string1).to.be.equal('sábado, 14 de octubre de 2017');

    const string2 = i18n.getDate('en', date, format, timezone);
    expect(string2).to.be.equal('Saturday, October 14, 2017');
  });

  it('should support timezones', () => {
    const format = 'short';

    const timezone1 = 'America/Mexico_City';
    const date1 = moment('2017-10-14T00:00:00.000Z').tz(timezone1).toDate();
    const expectedDate1 = moment(date1).tz(timezone1).format('MM/DD/YYYY');

    const timezone2 = 'Asia/Tokyo';
    const date2 = moment('2017-10-14T00:00:00.000Z').tz(timezone2).toDate();
    const expectedDate2 = moment(date2).tz(timezone2).format('MM/DD/YYYY');

    const string1 = i18n.getDate('en', date1, format, timezone1);
    expect(string1).to.be.equal(expectedDate1);

    const string2 = i18n.getDate('en', date2, format, timezone2);
    expect(string2).to.be.equal(expectedDate2);
  });
});
