// gulpfile.js
//=========================================

var gulp = require('gulp');
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify-css');

gulp.task('minify-js', function(){
   gulp.src('./app/assets/js/*.js')
   .pipe(concat('script.js'))
   .pipe(uglify())
   .pipe(gulp.dest('app/assets/build/scripts'));
});

gulp.task('minify-css', function(){
   gulp.src('./app/assets/css/*.css')
   .pipe(concat('styles.css'))
   .pipe(minify())
   .pipe(gulp.dest('app/assets/build/styles'));
});

gulp.task('watch', function(){
  gulp.watch('./app/assets/js/*.js', ['minify-js']);
  gulp.watch('./app/assets/css/*.css', ['minify-css']);
});

gulp.task('default',['minify-css', 'minify-js'],function(){
	console.log("Gulp task execution...");
});
