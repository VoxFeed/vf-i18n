module.exports = (type, format, validFormats) => {
  if (!validFormats.includes(format)) throw new Error(`Invalid ${type} format "${format}". Valid ones are: ${validFormats.join(', ')}.`);
};
