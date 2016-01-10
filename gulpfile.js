'use strict';

var gulp = require('gulp');
var typescript = require('typescript');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var electronServer = require('electron-connect').server;
var packager = require('electron-packager');
var pkg = require('./package.json');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var appDir = 'app/' + '';
var distDir = 'dist';
var serveDir = '.serve';
var releaseDir = 'release';
var project = $.typescript.createProject('./tsconfig.json', {typescript: typescript});

gulp.task('html', function () {
  gulp.src(appDir + '/*.html')
    .pipe(gulp.dest(serveDir))
    .pipe($.useref())
    .pipe(gulp.dest(distDir));
  return gulp.src(appDir + '/views/*.html')
    .pipe(gulp.dest(serveDir + '/views'))
    .pipe(gulp.dest(distDir + '/views'));
});

gulp.task('ts', function () {
  return gulp.src(appDir + '/**/*{ts,tsx}')
    .pipe($.typescript(project))
    .js
    .pipe(gulp.dest(serveDir))
    .pipe(gulp.dest(distDir));
});

gulp.task('ts-compile', ['ts'], function () {
  return browserify(serveDir + '/index.js', { debug: true })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(serveDir))
    .pipe(gulp.dest(distDir));
});

gulp.task('js', function () {
  gulp.src('main.js')
    .pipe(gulp.dest(serveDir))
    .pipe(gulp.dest(distDir));
  gulp.src([appDir + '/lib/*.js'])
    .pipe($.plumber())
    .pipe(gulp.dest(serveDir + '/lib'))
    .pipe(gulp.dest(distDir + '/lib'));
  gulp.src([appDir + '/scripts/*.js', appDir + '/scripts/**/*.js'])
    .pipe($.plumber())
    .pipe(gulp.dest(serveDir + '/scripts'));
  return gulp.src([appDir + '/scripts/*.js', appDir + '/scripts/**/*.js'])
    .pipe($.plumber())
    .pipe($.concat('main.js'))
    .pipe($.uglify({ mangle: false }))
    .pipe(gulp.dest(distDir + '/scripts'));
});

gulp.task('app', function () {
  return gulp.src(['package.json'])
    .pipe(gulp.dest(serveDir))
    .pipe(gulp.dest(distDir));
});

gulp.task('css', function () {
  gulp.src(appDir + '/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest(serveDir + '/styles'));
  return gulp.src(appDir + '/styles/*.scss')
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
  gulp.src(['bower_components/react/react.min.js', 'bower_components/react/react-dom.min.js'])
    .pipe(gulp.dest(distDir));
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

gulp.task('build', ['html', 'ts-compile', 'js', 'css', 'app', 'vendor', 'lint'], function () {
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
  gulp.watch(['main.js', appDir + '/scripts/*.js', appDir + '/scripts/**/*.js'], ['js', 'js-hint']);
  gulp.watch([appDir + '/**/*{ts,tsx}'], ['ts-compile']);
  gulp.watch([appDir + '/styles/*.scss'], ['css', 'scss-lint']);
  gulp.watch([appDir + '/*.html', appDir + '/views/*.html'], ['html']);
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
      version: '0.34.1'
    }, function (err) {
      done();
    });
  });
  return taskName;
}));

gulp.task('ts-lint', function() {
  return gulp.src(appDir + '/**/*.ts')
    .pipe($.tslint())
    .pipe($.tslint.report('verbose'));
});

gulp.task('js-hint', function() {
  return gulp.src(appDir + '/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('scss-lint', function() {
  return gulp.src(appDir + '/**/*.scss')
    .pipe($.scssLint({
      'config': './scss-lint.yml',
    }));
});

gulp.task('lint', ['ts-lint', 'js-hint', 'scss-lint'], function() {
});

gulp.task('default', ['build', 'watch'], function () {
});
