module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['ts*.json'],
      options: { parser: 'json-stringify' },
    },
  ],
};
