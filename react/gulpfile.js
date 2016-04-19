var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var port = process.env.port || 8080;

gulp.task('browserify', function() {
  browserify('./src/app/app.js')
    .transform('babelify', {presets: ["react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./src/dist'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: port,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('./src/app/**/*.js', ['browserify'])
});

gulp.task('default', ['browserify']);
gulp.task('serve', ['connect', 'watch']);
