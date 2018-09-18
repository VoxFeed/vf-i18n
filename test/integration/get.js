const sinon = require('sinon');
const VFi18n = require('../../src');

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
const DEFAULT_LOCALE = 'en';

const onMissingString = sinon.spy();
const i18n = new VFi18n({
  onMissingString,
  strings: LOCALES,
  fallbackLocales: [DEFAULT_LOCALE, SOURCE_LOCALE]
});

describe('i18n.get', () => {
  beforeEach(() => {
    onMissingString.resetHistory();
  });

  it('should select an string depending on the locale specified', () => {
    const key = 'HELLO';

    const stringEs = i18n.get('es', key);
    expect(stringEs).to.be.equal('¡Hola mundo!');

    const stringEn = i18n.get('en', key);
    expect(stringEn).to.be.equal('Hello world!');
  });

  it('should replace data when string has ICU format', () => {
    const key = 'GREETING';
    const name = '';
    const data = {name};

    const stringEs = i18n.get('es', key, data);
    expect(stringEs).to.be.equal(`Hola ${name}`);

    const stringEn = i18n.get('en', key, data);
    expect(stringEn).to.be.equal(`Hello ${name}`);
  });

  it('should work with plurals in ICU format', () => {
    const key = 'POSTS';
    const testCases = [
      {locale: 'es', posts: 0, expected: 'No tienes publicaciones'},
      {locale: 'en', posts: 1, expected: 'You have one post'},
      {locale: 'es', posts: 1000, expected: 'Tienes 1,000 publicaciones'}
    ];

    testCases.forEach(testCase => {
      const {locale, posts, expected} = testCase;
      const string = i18n.get(locale, key, {posts});
      expect(string).to.be.equal(expected);
    });
  });

  it('should support decimals2, specifying a precision of 2', () => {
    const key = 'DECIMALS';
    const value = 1234.56789;

    const stringEs = i18n.get('es', key, {value});
    expect(stringEs).to.be.equal('Valor: 1,234.57');

    const stringEn = i18n.get('en', key, {value});
    expect(stringEn).to.be.equal('Value: 1,234.57');
  });

  it('should support usd format', () => {
    const key = 'DOLLARS';
    const value = 1234.56789;

    const stringEs = i18n.get('es', key, {value});
    expect(stringEs).to.be.equal('Ganancias: $1,234.57 USD');

    const stringEn = i18n.get('en', key, {value});
    expect(stringEn).to.be.equal('Earnings: $1,234.57 USD');
  });

  it('should use first fallback locale when requesting a key not available in locale', () => {
    const notSupportedLocale = 'it';
    const key = 'HELLO';

    const stringNotSupportedLocale = i18n.get(notSupportedLocale, key);
    const stringSourceLocale = i18n.get(DEFAULT_LOCALE, key);
    expect(stringNotSupportedLocale).to.be.equal(stringSourceLocale);
  });

  it('should use second fallback locale when requesting a key not available in locale', () => {
    const notSupportedLocale = 'it';
    const key = 'ONLY_IN_SOURCE_LOCALE';

    const stringNotSupportedLocale = i18n.get(notSupportedLocale, key);
    const stringSourceLocale = i18n.get(SOURCE_LOCALE, key);
    expect(stringNotSupportedLocale).to.be.equal(stringSourceLocale);
  });

  it('should not inform error when key exist in source locale', () => {
    const key = 'HELLO';

    const stringEs = i18n.get('es', key);
    expect(stringEs).to.be.equal('¡Hola mundo!');
    expect(onMissingString.callCount).to.be.equal(0);
  });

  it('should inform error when key does not exist in source locale', () => {
    const locale = SOURCE_LOCALE;
    const key = 'NOT_EXISTENT_KEY';

    const string = i18n.get(locale, key);
    expect(string).to.be.equal('');

    expect(onMissingString.callCount).to.be.equal(1);
    expect(onMissingString.firstCall.args).to.be.deep.equal([{locale, key}]);
  });

  it('should do nothing when key does not exist but did not send "onMissingString"', () => {
    const i18n = new VFi18n({
      strings: LOCALES,
      fallbackLocales: [DEFAULT_LOCALE, SOURCE_LOCALE]
    });
    const locale = SOURCE_LOCALE;
    const key = 'NOT_EXISTENT_KEY';

    const string = i18n.get(locale, key);
    expect(string).to.be.equal('');
  });
});
