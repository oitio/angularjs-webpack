# angularjs-webpack

[![Dependency Status](https://david-dm.org/psancho/angularjs-webpack/status.svg)](https://david-dm.org/psancho/angular-webpack#info=dependencies) [![devDependency Status](https://david-dm.org/psancho/angularjs-webpack/dev-status.svg)](https://david-dm.org/psancho/angularjs-webpack#info=devDependencies)

A complete, yet simple, starter for AngularJS using Webpack.

This workflow serves as a starting point for building AngularJS (1.x) applications using Webpack 2.x. Should be noted that apart from the pre-installed angular package, this workflow is pretty much generic.

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm scripts.

## Table of Contents

* [Quick start](#Quick-start)
* [Installing](#installing)
* [Running the app](#running-the-app)
* [Building files](#building-files)
* [Testing](#testing)
* [Licenses](#licenses)
* [Other resources](#other-resources)

## Quick start

```bash
# clone our repo
$ git clone https://github.com/psancho/angularjs-webpack.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm run start
```

Go to [http://localhost:8080](http://localhost:8080) in your browser.

## Installing

* Ensure you are running Node LTS/argon or later (`v6.1.x +`) and `npm` up to date.
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies

## Running the app

Just launch a Node server:
```bash
npm run start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

##Building files

* single run: `npm run build`

## Testing

### Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

## Licenses

This project come under the dual license MIT or Apache. The initial project is under MIT license. Some changes are inspired by projects under Apache license. Therefore you can choose either the former or the latter license.

* [MIT](./LICENSE-MIT)
* [Apache](./LICENSE-APACHE)

## Other resources

* [AngularClass/NG6-starter](https://github.com/AngularClass/NG6-starter), an AngularJS Starter repo for AngularJS + ES6 + Webpack
* [shakacode/bootstrap-loader](https://github.com/shakacode/bootstrap-loader), oad Bootstrap styles and scripts in your Webpack bundle


