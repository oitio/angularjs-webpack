'use strict';

// Modules
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';
let baseHref;
try {
    let config = JSON.parse(fs.readFileSync('./src/app/configFile.json', 'utf8'));
    baseHref = config.production.baseHref;
    console.log('BaseHref found: "' + baseHref + '".');
} catch (e) {
    console.log('Either cannot read config file or baseHref not set for production; assuming "/".');
    baseHref = '/';
}

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: https://webpack.js.org/configuration/
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Dev server configuration
     * Reference: https://webpack.js.org/configuration/dev-server/
     */
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    /**
     * Devtool
     * Reference: https://webpack.js.org/configuration/devtool/
     * Type of sourcemap to use per build type
     */
    if (isTest) {
        config.devtool = 'inline-source-map';
    }
    else if (isProd) {
        config.devtool = 'source-map';
    }
    else {
        config.devtool = 'eval-source-map';
    }

    /**
     * Entry
     * Reference: https://webpack.js.org/configuration/entry-context/
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    config.entry = isTest ? void 0 : {
        app: './src/app/app.js'
    };

    /**
     * Loaders
     * Reference: https://webpack.js.org/configuration/module/
     * List: https://webpack.js.org/loaders/
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        rules: [{
            // JS LOADER
            // Reference: https://github.com/babel/babel-loader
            // Transpile .js files using babel-loader
            // Compiles ES6 and ES7 into ES5 code
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            // CSS LOADER
            // Reference: https://github.com/webpack/css-loader
            // Allow loading css through js
            //
            // Reference: https://github.com/postcss/postcss-loader
            // Postprocess your css with PostCSS plugins
            test: /\.css$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files in production builds
            //
            // Reference: https://github.com/webpack/style-loader
            // Use style-loader in development.

            use: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {loader: 'css-loader', query: {sourceMap: true}},
                    {loader: 'postcss-loader'}
                ],
            })
        }, {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            use: 'file-loader'
        }, {
            // HTML LOADER
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.html$/,
            use: 'raw-loader'
        }]
    };

    // ISTANBUL LOADER
    // https://github.com/deepsweet/istanbul-instrumenter-loader
    // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
    // Skips node_modules and files that end with .spec.js
    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            use: {
                loader: 'istanbul-instrumenter-loader',
                query: { esModules: true }
            }
        })
    }

    /**
     * Output
     * Reference: https://webpack.js.org/configuration/output/
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    config.output = isTest ? {} : {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? baseHref : 'http://localhost:8080/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
     // NOTE: This is now handled in the `postcss.config.js`
     //       webpack2 has some issues, making the config file necessary

    /**
     * Plugins
     * Reference: https://webpack.js.org/configuration/plugins/
     * List: https://webpack.js.org/plugins/
     */
    config.plugins = [
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        })
    ];

    // Skip rendering index.html in test mode
    if (!isTest) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body'
            }),

            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin({
                filename: 'css/[name].css',
                disable: !isProd,
                allChunks: true
            })
        )
    }

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: https://webpack.js.org/plugins/no-emit-on-errors-plugin/
            // Only emit files when there are no errors
            new webpack.NoEmitOnErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin(),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }]),

            new BaseHrefWebpackPlugin({ baseHref: baseHref })
        )
    }

    return config;
}();
