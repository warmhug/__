'use strict';

var gulp = require('gulp'),
  path = require('path'),
  less = require('gulp-less'),
  watch = require('gulp-watch'),
  fs = require('fs')

var concat = require('gulp-concat');
var insert = require('gulp-insert');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');


gulp.task('style', function(cb){
  return gulp.src('.ui/less/fc.less')
    .pipe(less())
    .pipe(gulp.dest('./public/styles/'))
    .on('error',function(err){
      console.log( err );
    });

})

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('watch-style',function(){
  gulp.watch(path.join(sourcePath,'/*.less'),['style'])
})

gulp.task('default', ['style']);
