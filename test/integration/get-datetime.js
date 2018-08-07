const moment = require('moment-timezone');
const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getDateTime', () => {
  it('should implement short format', () => {
    const format = 'short';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getDateTime('es', date, format, timezone);
    expect(string1).to.be.equal('14/10/2017 18:30');

    const string2 = i18n.getDateTime('en', date, format, timezone);
    expect(string2).to.be.equal('10/14/2017 6:30 PM');
  });

  it('should implement medium format', () => {
    const format = 'medium';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getDateTime('es', date, format, timezone);
    expect(string1).to.be.equal('14 de oct. de 2017 18:30');

    const string2 = i18n.getDateTime('en', date, format, timezone);
    expect(string2).to.be.equal('Oct 14, 2017 6:30 PM');
  });

  it('should implement long format', () => {
    const format = 'long';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getDateTime('es', date, format, timezone);
    expect(string1).to.be.equal('14 de octubre de 2017 18:30');

    const string2 = i18n.getDateTime('en', date, format, timezone);
    expect(string2).to.be.equal('October 14, 2017 6:30 PM');
  });

  it('should implement full format', () => {
    const format = 'full';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getDateTime('es', date, format, timezone);
    expect(string1).to.be.equal('sábado, 14 de octubre de 2017 18:30');

    const string2 = i18n.getDateTime('en', date, format, timezone);
    expect(string2).to.be.equal('Saturday, October 14, 2017 6:30 PM');
  });

  it('should support timezones', () => {
    const format = 'full';

    const dateStr = '2017-10-14T18:30:05.000Z';
    const timezone1 = 'America/Mexico_City';
    const date1 = moment(dateStr).tz(timezone1).toDate();
    const expectedDate1 = 'Saturday, October 14, 2017 1:30 PM';

    const timezone2 = 'Asia/Tokyo';
    const date2 = moment(dateStr).tz(timezone2).toDate();
    const expectedDate2 = 'Sunday, October 15, 2017 3:30 AM';

    const string1 = i18n.getDateTime('en', date1, format, timezone1);
    expect(string1).to.be.equal(expectedDate1);

    const string2 = i18n.getDateTime('en', date2, format, timezone2);
    expect(string2).to.be.equal(expectedDate2);
  });
});
