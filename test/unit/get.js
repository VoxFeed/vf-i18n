const sinon = require('sinon');
const proxyquire = require('proxyquire');

const LOCALES = {
  es: {
    HELLO: '¡Hola mundo!',
    GREETING: 'Hola {name}',
    POSTS: `{posts, plural,
      =0 {No tienes publicaciones}
      =1 {Tienes una publicación}
      other {Tienes {posts, number} publicaciones}
    }`,
    DECIMALS: 'Valor: {value, decimal, 2}',
    DOLLARS: 'Ganancias: {value, currency, usd}',
    DATE: 'Registrado desde {value, date, medium}',
    TIME: 'Haz tu publicación a las {value, time, short}',
    RELATIVE_TIME: 'Tu pago será enviado {value, relativeTime, days, best fit}',
    NUMBERS_LOCALE: 'en',
    TIMES_LOCALE: 'en',
    ONLY_IN_SOURCE_LOCALE: 'Este mensaje sólo está en el locale principal'
  },
  en: {
    HELLO: 'Hello world!',
    GREETING: 'Hello {name}',
    POSTS: `You have {posts, plural,
      =0 {no posts}
      =1 {one post}
      other {{posts, number} posts}
    }`,
    DECIMALS: 'Value: {value, decimal, 2}',
    DOLLARS: 'Earnings: {value, currency, usd}',
    DATE: 'Registered since {value, date, medium}',
    TIME: 'Post at {value, time, short}',
    RELATIVE_TIME: 'Your pay will be sent {value, relativeTime, days, best fit}',
    NUMBERS_LOCALE: 'en',
    TIMES_LOCALE: 'en'
  }
};
const SOURCE_LOCALE = 'es';
const DEFAULT_LOCALE = 'es';

const onMissingString = sinon.spy();
const getDate = sinon.stub().returns('DATE');
const getMoney = sinon.stub().returns('MONEY');
const getNumber = sinon.stub().returns('NUMBER');
const getTime = sinon.stub().returns('TIME');

describe('i18n.get', () => {
  let get;

  beforeEach(() => {
    onMissingString.resetHistory();
    getDate.resetHistory();
    getMoney.resetHistory();
    getNumber.resetHistory();
    getTime.resetHistory();

    get = proxyquire('../../src/get', {
      './get-date': getDate,
      './get-money': getMoney,
      './get-number': getNumber,
      './get-time': getTime
    }).bind({
      onMissingString,
      strings: LOCALES,
      fallbackLocales: [DEFAULT_LOCALE, SOURCE_LOCALE]
    });
  });

  it('should select an string depending on the locale specified', () => {
    const key = 'HELLO';

    const stringEs = get('es', key);
    expect(stringEs).to.be.equal('¡Hola mundo!');

    const stringEn = get('en', key);
    expect(stringEn).to.be.equal('Hello world!');
  });

  it('should replace data when string has ICU format', () => {
    const key = 'GREETING';
    const name = '';
    const data = {name};

    const stringEs = get('es', key, data);
    expect(stringEs).to.be.equal(`Hola ${name}`);

    const stringEn = get('en', key, data);
    expect(stringEn).to.be.equal(`Hello ${name}`);
  });

  it('should work with plurals in ICU format', () => {
    const key = 'POSTS';
    const testCases = [
      {locale: 'es', posts: 0, expected: 'No tienes publicaciones'},
      {locale: 'en', posts: 1, expected: 'You have one post'},
      {locale: 'es', posts: 1000, expected: 'Tienes NUMBER publicaciones'}
    ];

    testCases.forEach(testCase => {
      const {locale, posts, expected} = testCase;
      const string = get(locale, key, {posts});
      expect(string).to.be.equal(expected);
    });

    const expectedArgs = [
      ['es', 0],
      ['en', 1],
      ['es', 1000]
    ];
    expect(getNumber.callCount).to.be.equal(3);
    expect(getNumber.args).to.be.deep.equal(expectedArgs);
  });

  it('should support decimals2, specifying a precision of 2', () => {
    const key = 'DECIMALS';
    const value = 1234.56789;

    const stringEs = get('es', key, {value});
    expect(stringEs).to.be.equal('Valor: NUMBER');

    const stringEn = get('en', key, {value});
    expect(stringEn).to.be.equal('Value: NUMBER');

    const expectedArgs = [
      ['es', value, '2'],
      ['en', value, '2']
    ];
    expect(getNumber.callCount).to.be.equal(2);
    expect(getNumber.args).to.be.deep.equal(expectedArgs);
  });

  it('should support usd format', () => {
    const key = 'DOLLARS';
    const value = 1234.56789;

    const stringEs = get('es', key, {value});
    expect(stringEs).to.be.equal('Ganancias: MONEY');

    const stringEn = get('en', key, {value});
    expect(stringEn).to.be.equal('Earnings: MONEY');

    const expectedArgs = [
      ['es', value, 'usd'],
      ['en', value, 'usd']
    ];
    expect(getMoney.callCount).to.be.equal(2);
    expect(getMoney.args).to.be.deep.equal(expectedArgs);
  });

  it('should use first fallback locale when requesting a string not available in locale', () => {
    const notSupportedLocale = 'it';
    const key = 'HELLO';

    const stringNotSupportedLocale = get(notSupportedLocale, key);
    const stringSourceLocale = get(DEFAULT_LOCALE, key);
    expect(stringNotSupportedLocale).to.be.equal(stringSourceLocale);
  });

  it('should use second fallback locale when requesting a string not available in locale or 1st fallback', () => {
    const notSupportedLocale = 'it';
    const key = 'ONLY_IN_SOURCE_LOCALE';

    const stringNotSupportedLocale = get(notSupportedLocale, key);
    const stringSourceLocale = get(SOURCE_LOCALE, key);
    expect(stringNotSupportedLocale).to.be.equal(stringSourceLocale);
  });

  it('should not call "onMissingString" when key exist in locale', () => {
    const key = 'HELLO';

    const stringEs = get('es', key);
    expect(stringEs).to.be.equal('¡Hola mundo!');
    expect(onMissingString.callCount).to.be.equal(0);
  });

  it('should call "onMissingString" when key does not exist in locale', () => {
    const locale = SOURCE_LOCALE;
    const key = 'NOT_EXISTENT_KEY';

    const string = get(locale, key);
    expect(string).to.be.equal('');

    expect(onMissingString.callCount).to.be.equal(1);
    expect(onMissingString.firstCall.args).to.be.deep.equal([{locale, key}]);
  });

  it('should support date format, sending a timezone as ICU parameter', () => {
    const key = 'DATE';
    const value = new Date();
    const timezone1 = 'America/Mexico_City';
    const timezone2 = 'Asia/Tokyo';

    const options1 = {value, timezone: timezone1};
    const string1 = get('es', key, options1);
    expect(string1).to.be.equal('Registrado desde DATE');

    const options2 = {value, timezone: timezone2};
    const string2 = get('en', key, options2);
    expect(string2).to.be.equal('Registered since DATE');

    const expectedArgs = [
      ['es', value, 'medium', timezone1],
      ['en', value, 'medium', timezone2]
    ];
    expect(getDate.callCount).to.be.equal(2);
    expect(getDate.args).to.be.deep.equal(expectedArgs);
  });

  it('should support time format, sending a timezone as ICU parameter', () => {
    const key = 'TIME';
    const value = new Date();
    const timezone1 = 'America/Mexico_City';
    const timezone2 = 'Asia/Tokyo';

    const options1 = {value, timezone: timezone1};
    const string1 = get('es', key, options1);
    expect(string1).to.be.equal('Haz tu publicación a las TIME');

    const options2 = {value, timezone: timezone2};
    const string2 = get('en', key, options2);
    expect(string2).to.be.equal('Post at TIME');

    const expectedArgs = [
      ['es', value, 'short', timezone1],
      ['en', value, 'short', timezone2]
    ];
    expect(getTime.callCount).to.be.equal(2);
    expect(getTime.args).to.be.deep.equal(expectedArgs);
  });
});
