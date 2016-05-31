// Karma configuration
// Generated on Sun May 29 2016 15:57:24 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'public',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    // files: [
    //   '**/*.js'
    // ], 
    files: [
      'lib/angular/angular.min.js',
      'lib/Chart.js/Chart.js',
      'lib/angular-resource/angular-resource.min.js',
      'lib/angular-route/angular-route.min.js',
      'lib/angular-animate/angular-animate.min.js',
      'lib/angular-cookies/angular-cookies.min.js',
      'lib/angular-chart.js/dist/angular-chart.min.js',
      'lib/angular-ui-switch/angular-ui-switch.min.js',
      'lib/angucomplete-alt/angucomplete-alt.js',
      'lib/d3/d3.min.js',
      'lib/d3-cloud/build/d3.layout.cloud.js',
      'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'http://maps.google.com/maps/api/js?libraries=places',
      'lib/ngmap/build/scripts/ng-map.min.js',
      'lib/angular-mocks/angular-mocks.js',
      '../node_modules/sinon/sinon-1.15.0.js',
      'js/**/*.js',
      '../tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
