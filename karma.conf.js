// Reference: http://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function karmaConfig (config) {
    config.set({
        // base path used to resolve all patterns
        basePath: '',

        frameworks: [
            // Reference: https://github.com/karma-runner/karma-jasmine
            // Set framework to jasmine
            'jasmine'
        ],

        reporters: [
            // Reference: https://github.com/mlex/karma-spec-reporter
            // Set reporter to print detailed results to console
            'progress',

            // Reference: https://github.com/karma-runner/karma-coverage
            // Output code coverage files
            'coverage'
        ],

        files: [
            // Grab all files in the app folder that contain .spec.
            'src/spec.bundle.js'
        ],

        preprocessors: {
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            'src/spec.bundle.js': ['webpack', 'sourcemap']
        },

        browsers: [
            // Run tests using PhantomJS
            'PhantomJS'
        ],

        singleRun: true,

        // Configure code coverage reporter
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'html'}
            ]
        },

        webpack: require('./webpack.config'),

        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: 'errors-only'
        }
    });
};
