/**
 * Created by hua on 15/3/17.
 */
var fs = require('fs');
var path = require('path');

var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var del = require('del');

var browserify = require("browserify");
var babelify = require("babelify");
var exorcist = require('exorcist');

gulp.task('clean', function(cb) {
    console.log('delll')
  // You can use multiple globbing patterns as you would with `gulp.src`
  // del(['dist'], cb);
  del.sync(['dist']);
});

gulp.task("compile", function () {
  return (
    gulp.src("lib/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("build.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
  )
});

gulp.task('browserify', function () {
 
   del.sync(['dist']);
   fs.mkdirSync('./dist');

   browserify({ debug: true })
    .transform(babelify)
    .require("./index.js", { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(exorcist(path.join(__dirname, './dist/bundle.js.map')))
    .pipe(fs.createWriteStream("./dist/bundle.js"));

});

gulp.task('watch', function (){
  gulp.watch('lib/*.js', ['browserify'])
});

gulp.task('default', ['browserify', 'watch']);
