const common = {
  requireModule: ['ts-node/register'],
  require: [
    'src/test/cucumber/support/dom.setup.tsx',
    'src/test/cucumber/steps/**/*.tsx',
    'src/test/cucumber/support/**/*.tsx'
  ],
  paths: ['src/features/**/*.feature'],
  format: ['summary', 'html:reports/cucumber-report.html'],
  formatOptions: { snippetInterface: 'async-await' },
};

module.exports = {
  default: {
    ...common,
  }
};