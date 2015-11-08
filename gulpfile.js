'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var electronServer = require('electron-connect').server;
var packager = require('electron-packager');
var pkg = require('./package.json');
var del = require('del');

var distDir = 'dist';
var serveDir = '.serve';
var releaseDir = 'release';

gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(gulp.dest(serveDir))
    .pipe($.useref())
    .pipe(gulp.dest(distDir));
  return gulp.src('app/views/*.html')
    .pipe(gulp.dest(serveDir + '/views'))
    .pipe(gulp.dest(distDir + '/views'));
});

gulp.task('js', function () {
  gulp.src('main.js')
    .pipe(gulp.dest(serveDir))
    .pipe(gulp.dest(distDir));
  gulp.src(['app/scripts/*.js', 'app/scripts/**/*.js'])
    .pipe($.plumber())
    .pipe(gulp.dest(serveDir + '/scripts'));
  return gulp.src(['app/scripts/*.js', 'app/scripts/**/*.js'])
    .pipe($.plumber())
    .pipe($.concat('main.js'))
//    .pipe($.uglify('main.js'))
    .pipe(gulp.dest(distDir + '/scripts'));
});

gulp.task('app', function () {
  return gulp.src(['package.json'])
    .pipe(gulp.dest(serveDir))
    .pipe(gulp.dest(distDir));
});

gulp.task('css', function () {
  gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest(serveDir + '/styles'));
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.concat('main.css'))
    .pipe(gulp.dest(distDir + '/styles'));
});

gulp.task('vendor', function () {
  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(distDir));
  gulp.src('bower_components/bootstrap/dist/fonts/*')
    .pipe(gulp.dest(distDir + '/fonts'));
  return gulp.src(mainBowerFiles({
      overrides: {
        bootstrap: {
          main: [
            './dist/js/bootstrap.js',
            './dist/css/*.min.*',
          ]
        }
      }
    }))
    .pipe(gulp.dest(serveDir + '/vendor'))
    .pipe($.plumber())
    .pipe($.if(function(file){
        return file.path.substr(-4) === '.css';
      }
      ,$.concat('vendor.css')
      ,$.concat('vendor.js')
    ))
    .pipe(gulp.dest(distDir + '/vendor'));
});

gulp.task('build', ['html', 'js', 'css', 'app', 'vendor'], function () {
  return console.log('build finished!');
});

gulp.task('serve', ['build', 'watch'], function () {
  var electron = electronServer.create({ path: serveDir });
  electron.start();
  
  gulp.watch(['main.js'], electron.restart);
  gulp.watch([serveDir + '/scripts/*.js'], electron.restart);
  gulp.watch([serveDir + '/**/*.html', serveDir + '/styles/*.css'], electron.reload);
});

gulp.task('watch', function() {
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], ['js']);
  gulp.watch(['app/styles/*.scss'], ['css']);
  gulp.watch(['app/*.html', 'app/views/*.html'], ['html']);
  gulp.watch('gulpfile.js', ['build']);
});

gulp.task('clean', function (done) {
  del([serveDir, distDir, releaseDir], function () {
    done();
  });
});

gulp.task('package', ['win32', 'darwin'].map(function (platform) {
  var taskName = 'package:' + platform;
  gulp.task(taskName, ['build'], function (done) {
    packager({
      dir: distDir,
      name: pkg.name,
      arch: 'x64',
      platform: platform,
      out: releaseDir,
      overwrite: true,
      version: '0.30.0'
    }, function (err) {
      done();
    });
  });
  return taskName;
}));

gulp.task('default', ['build', 'watch'], function () {
});
