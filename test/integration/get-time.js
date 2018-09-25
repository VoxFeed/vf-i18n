const moment = require('moment-timezone');
const VFi18n = require('../../src');
const i18n = new VFi18n();

describe('i18n.getTime', () => {
  it('should implement short format', () => {
    const format = 'short';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getTime('es', date, format, timezone);
    expect(string1).to.be.equal('6:30 PM');

    const string2 = i18n.getTime('en', date, format, timezone);
    expect(string2).to.be.equal('6:30 PM');
  });

  it('should implement medium format', () => {
    const format = 'medium';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getTime('es', date, format, timezone);
    expect(string1).to.be.equal('6:30:05 PM');

    const string2 = i18n.getTime('en', date, format, timezone);
    expect(string2).to.be.equal('6:30:05 PM');
  });

  it('should implement long format', () => {
    const format = 'long';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getTime('es', date, format, timezone);
    expect(string1).to.be.equal('6:30:05 PM');

    const string2 = i18n.getTime('en', date, format, timezone);
    expect(string2).to.be.equal('6:30:05 PM');
  });

  it('should implement full format', () => {
    const format = 'full';
    const timezone = 'UTC';
    const date = moment('2017-10-14T18:30:05.000Z').tz(timezone).toDate();

    const string1 = i18n.getTime('es', date, format, timezone);
    expect(string1).to.be.equal('6:30:05 PM +00:00');

    const string2 = i18n.getTime('en', date, format, timezone);
    expect(string2).to.be.equal('6:30:05 PM +00:00');
  });

  it('should support timezones', () => {
    const format = 'full';

    const dateStr = '2017-10-14T18:30:05.000Z';
    const timezone1 = 'America/Mexico_City';
    const date1 = moment(dateStr).tz(timezone1).toDate();
    const expectedDate1 = '1:30:05 PM -05:00';

    const timezone2 = 'Asia/Tokyo';
    const date2 = moment(dateStr).tz(timezone2).toDate();
    const expectedDate2 = '3:30:05 AM +09:00';

    const string1 = i18n.getTime('en', date1, format, timezone1);
    expect(string1).to.be.equal(expectedDate1);

    const string2 = i18n.getTime('en', date2, format, timezone2);
    expect(string2).to.be.equal(expectedDate2);
  });
});
