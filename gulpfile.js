/*
 * @Author: dctxf
 * @Date:   2017-06-05 14:34:18
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-06-15 14:32:19
 */

'use strict';

const CONFIG = {
  DEV: './src',
  DIST: './',
  PAGES: './dist'
};
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const inlinesource = require('gulp-inline-source');
const LessAutoprefix = require('less-plugin-autoprefix');
const sourcemaps = require('gulp-sourcemaps');
const autoprefix = new LessAutoprefix({ browsers: ['last 8 versions'] });
const htmlmin = require('gulp-htmlmin');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const data = require('./data/data.json');
gulp.task('render', ['server'], function () {
  return gulp.src(CONFIG.DEV + '/html/index.html')
    .pipe(inlinesource())
    .pipe(nunjucksRender({
      path: '.',
      data: data,
      inheritExtension: true,
    }))
    .pipe(gulp.dest(CONFIG.PAGES));
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
// 静态服务器
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: CONFIG.PAGES,
      routes: {
        '/static': '../../static/'
      }
    }
  });
});
// 构建
gulp.task('build', ['css'], function () {
  return gulp.src(CONFIG.DEV + '/html/**/*.html')
    .pipe(inlinesource())
    .pipe(htmlmin({
      collapseWhitespace: true,
      ignoreCustomFragments: [/{%[\s\S]*?%}/, /{{[\s\S]*?}}/]
    }))
    .pipe(gulp.dest(CONFIG.DIST));
});
gulp.task('default', ['dev'], function () {
  gulp.watch(CONFIG.DEV + '/less/**/*.less', ['html']);
  gulp.watch(CONFIG.DEV + '/html/**/*.html', ['html']);
});

