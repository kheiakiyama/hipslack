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

gulp.task('css', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.concat('main.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('build', ['html', 'js', 'css'], function () {
  console.log('build finished!');
});

gulp.task('watch', function() {
  gulp.watch(['app/scripts/**/*.js'], ['js']);
  gulp.watch(['app/styles/*.scss'], ['css']);
  gulp.watch(['app/*.html', 'app/views/*.html'], ['html']);
  gulp.watch('gulpfile.js', ['build']);
});

gulp.task('default', ['build', 'watch'], function () {
});
