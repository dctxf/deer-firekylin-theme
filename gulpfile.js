/*
 * @Author: dctxf
 * @Date:   2017-06-05 14:34:18
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-06-05 16:00:13
 */

'use strict';

const CONFIG = {
  DEV: './src',
  DIST: './'
};
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const inlinesource = require('gulp-inline-source');
const LessAutoprefix = require('less-plugin-autoprefix');
const sourcemaps = require('gulp-sourcemaps');
const autoprefix = new LessAutoprefix({ browsers: ['last 8 versions'] });
// html编译
gulp.task('html',['css'], function () {
  return gulp.src(CONFIG.DEV + '/html/**/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest(CONFIG.DIST+'/html'));
});
// css编译-补全
gulp.task('css', function () {
  return gulp.src(CONFIG.DEV + '/less/**/all.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [autoprefix]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.DEV + '/css'));
});
gulp.task('default', function () {
  gulp.watch(CONFIG.DEV + '/less/**/*.less', ['html']);
  gulp.watch(CONFIG.DEV + '/html/**/*.html', ['html']);
});

