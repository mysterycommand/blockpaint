const CracoBlockstack = require('craco-blockstack');

module.exports = {
  plugins: [{ plugin: CracoBlockstack }],
  jest: {
    configure: config => ({
      ...config,
      setupFiles: [...config.setupFiles, 'jest-canvas-mock'],
      testMatch: [...config.testMatch, '<rootDir>/src/**/tests.{j,t}s?(x)'],
    }),
  },
};
