'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(gulp.dest('dist/'));
  return gulp.src('app/views/*.html')
    .pipe(gulp.dest('dist/views'));
});

gulp.task('js', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('main.js'))
    .pipe($.uglify('main.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('build', ['html', 'js'], function () {
  console.log('build finished!');
});

gulp.task('default', function () {
  gulp.start('build');
});
