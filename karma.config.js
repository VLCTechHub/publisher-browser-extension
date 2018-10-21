module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'fixture', 'sinon', 'sinon-chrome'],
    files: [
      'src/**/*.js',
      'test/**/*.js',
      'test/fixtures/*.html'
    ],
    exclude: [
      'src/js/background.js',
      'src/js/vendor/*.js'
    ],
    preprocessors: {
      'test/fixtures/*.html': ['html2js']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity
  })
}
