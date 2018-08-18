'use strict';

const path = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');
const guglify = require('gulp-uglifyjs');
const webpack = require('gulp-webpack');

const pkg = require('./package.json');
const bower = require('./bower.json');

function errorHandler(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}

function webpackWrapper(callback) {
  const webpackOptions = {
    watch: !!callback,
    devtool: 'inline-source-map',
    module: {
      // preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']}]
    },
    output: { filename: bower.name.concat('.js') }
  };

  const webpackChangeHandler = function(err, stats) {
    if(err) {
      errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: gutil.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    if(callback) {
      callback();
      callback = null;
    }
  };

  return gulp.src([ pkg.main ])
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(''))
    .pipe(guglify(bower.name.concat('.min.js')))
    .pipe(gulp.dest(''));
    
}

gulp.task('build', function () {
  return webpackWrapper();
});

gulp.task('watch', function (callback) {
  return webpackWrapper(callback);
});

gulp.task('default', ['build']);
