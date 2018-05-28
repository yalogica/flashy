'use strict';

var gulp = require('gulp'),
	debug = require('gulp-debug'),
	gulpif = require('gulp-if'),
	cache = require('gulp-cached'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-rimraf'),
	sequence = require('gulp-sequence'),
	php = require('gulp-connect-php'),
	util = require('gulp-util'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	args = require('yargs').argv,
	pack = args.pack || false;
	pack = (pack ? true : false);

var build_path = 'build';

gulp.task('php', function() {
	php.server({ base: '.', port: 8010, keepalive: true});
});

 gulp.task('webserver', ['php'], function () {
	browserSync({
		startPath: 'demo/index.html',
		proxy: '127.0.0.1:8010',
		port: 8080,
		open: true,
		notify: false
	});
});

gulp.task('clean', function() {
	return gulp.src([build_path + '/*'], { read: false }).pipe(clean({ force: true }));
});

gulp.task('less', function() {
	return gulp.src(['src/**/*.less'])
	.pipe(cache('cacheless'))
	.pipe(debug())
	.pipe(less())
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('src'))
});

gulp.task('styles', function() {
	return gulp.src(['src/**/*.css', '!src/**/*.min.css'])
	.pipe(cache('cachestyles'))
	.pipe(debug())
	.pipe(gulpif(pack, minifycss()))
	.pipe(rename(function (path) { path.basename += ".min"; }))
	.pipe(gulp.dest('src'))
	.pipe(gulp.dest(build_path))
	.pipe(reload({stream: true})); // inject styles
});

gulp.task('scripts', function() {
	return gulp.src(['src/**/*.js', '!src/**/*.min.js'])
	.pipe(cache('cachescripts'))
	.pipe(debug())
	.pipe(gulpif(pack, uglify().on('error', util.log)))
	.pipe(rename(function (path) { path.basename += ".min"; }))
	.pipe(gulp.dest('src'))
	.pipe(gulp.dest(build_path))
	.pipe(reload({stream: true})); // inject scripts
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.less'], ['less']);
	gulp.watch(['src/**/*.css', '!src/**/*.min.css'], ['styles']);
	gulp.watch(['src/**/*.js', '!src/**/*.min.js'], ['scripts']);
});

gulp.task('build', sequence(
	'clean',
	'less',
	'styles',
	'scripts'
));

gulp.task('default', sequence('build', 'webserver', 'watch'));