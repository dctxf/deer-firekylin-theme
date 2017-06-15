/*
 * @Author: dctxf
 * @Date:   2017-06-05 14:34:18
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-06-15 16:42:43
 */

'use strict';
const CONFIG = {
  DEV: './src',
  FIRE: './firekylin/',
  DIST: './dist',
  RES: './firekylin/www/theme/deer/res/',
  THEME: './firekylin/www/theme/deer/'
};
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const inlinesource = require('gulp-inline-source');
const LessAutoprefix = require('less-plugin-autoprefix');
const sourcemaps = require('gulp-sourcemaps');
const autoprefix = new LessAutoprefix({ browsers: ['last 8 versions'] });
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');
// css编译-补全
gulp.task('css', function () {
  return gulp.src(CONFIG.DEV + '/less/**/all.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [autoprefix]
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.RES + '/css'));
});
// clean
gulp.task('clean', ['clean-dist']);
gulp.task('clean-dist', function () {
  return gulp.src(CONFIG.DIST, { read: false })
    .pipe(clean());
});
gulp.task('copy', function () {
  var files = ['README.md', 'package.json', 'screenshot.png'];
  return gulp.src(files).pipe(gulp.dest(CONFIG.DIST));
});

// env
gulp.task('dev', ['css'], function () {
  gulp.watch(CONFIG.DEV + '/less/**/*.less', ['css']);
});
// build
gulp.task('build', ['css', 'copy'], function () {
  return gulp.src(CONFIG.THEME + '/**/*.html')
    .pipe(inlinesource())
    .pipe(htmlmin({
      collapseWhitespace: true,
      ignoreCustomFragments: [/{%[\s\S]*?%}/, /{{[\s\S]*?}}/]
    }))
    .pipe(gulp.dest(CONFIG.DIST));
});
gulp.task('default', ['dev']);

