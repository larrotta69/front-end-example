var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('server', ['sass'], function(){
    browserSync({
        server: {
            baseDir: './app',
        },
        port: 8080
    });

    gulp.watch('./app/index.html', ['HTMLwatch']);
    gulp.watch('./src/sass/main.scss',['CSSwatch'])
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('HTMLwatch', function(){
    browserSync.reload();
})

gulp.task('CSSwatch',['sass'], function(){
    browserSync.reload();
})
