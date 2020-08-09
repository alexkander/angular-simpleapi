'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack-stream');

const pkg = require('./package.json');
const bower = require('./bower.json');

function errorHandler(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}

function webpackWrapper(mode, filename, callback) {
  const webpackOptions = {
    watch: !!callback,
    mode: mode,
    devtool: 'inline-source-map',
    module: {
      rules: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate-loader', 'babel-loader?presets[]=es2015']}]
    },
    output: { filename: filename }
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
    .pipe(gulp.dest('./'))
    // .pipe(guglify(bower.name.concat('.min.js')))
    // .pipe(gulp.dest('./'));
    
}

gulp.task('build', function () {
  return webpackWrapper('development', bower.name.concat('.js'));
});

gulp.task('build:min', function () {
  return webpackWrapper('production', bower.name.concat('.min.js'));
});

gulp.task('watch', function (callback) {
  return webpackWrapper('development', bower.name.concat('.js'), callback);
});

gulp.task('default', gulp.series('build', 'build:min'));
