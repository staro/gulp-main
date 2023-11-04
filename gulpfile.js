const gulp = require('gulp');
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const startServer = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')

const fileIncludeSettings = {
	prefix: '@@',
	basepath: '@file'
}

const serverOptions = {
	livereload: true,
	open: true
}

gulp.task('html', function () {
	return gulp
		.src('./app/*.html')
		.pipe(fileInclude(fileIncludeSettings))
		.pipe(gulp.dest('./dist'))
})

gulp.task('sass', function () {
	return gulp
		.src('./app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('images', function () {
	return gulp
		.src('./app/images/**/*')
		.pipe(gulp.dest('./dist/images'))
})

gulp.task('server', function () {
	return gulp
		.src('./dist')
		.pipe(startServer(serverOptions))
})

gulp.task('clean', function (done) {
	if (fs.existsSync('./dist')) {
		return gulp
			.src('./dist', { read: false })
			.pipe(clean({ force: true }))
	}
	done()
})

gulp.task('watch', function () {
	gulp.watch('./app/scss/**/*.scss', gulp.parallel('sass'))
	gulp.watch('./app/**/*.html', gulp.parallel('html'))
	gulp.watch('./app/images/**/*', gulp.parallel('images'))
})

gulp.task('default', gulp.series(
	'clean',
	gulp.parallel('html', 'sass', 'images'),
	gulp.parallel('server', 'watch')
))