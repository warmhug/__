

var fs = require('fs');

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var ngHtml2Js = require("gulp-ng-html2js");
var concat = require('gulp-concat');
var eventStream = require('event-stream');


// cors 跨域
// var cors = require('express-cors')
// app.use(cors({
//   allowedOrigins: [
//       'localhost:*'
//   ],
//   headers: ['X-Requested-With', 'Content-Type', 'authorization']
// }))


// // some good tools
// var mergeStream = require('merge-stream');
// var runSequence = require('run-sequence');
// var gutil = require('gulp-util')
// var requireDir = require('require-dir');

// livereload 浏览器插件 只能监听 35729 端口！不能修改。mac客户端又是收费的！！果断弃用
// 使用：http://www.browsersync.io/
//    安装：npm install -g browser-sync
//    正常启动：browser-sync start --server --files "css/*.css"
//    代理启动：browser-sync start --proxy="localhost:8000" --files="bundles/**"


gulp.task('default', function() {
  tpl2js()
})

function tpl2js() {
  var arr = [];
  ['layouts', 'bundles', 'common'].forEach(function (appPath) {
    var temp = walk(appPath, function(file) {
      return /\.html$/.test(file)
    });
    arr = arr.concat(temp)
  });

  var streams = [];
  arr.forEach(function (path) {
    streams.push( gulp.src(path)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(ngHtml2Js({
          moduleName: 'flaming.cloud',
          prefix: '' + path.match(/(.*\/)([^/]*)/)[1],
          declareModule: false
        })) )
  });

  eventStream.merge.apply(this, streams)
  .pipe(concat('_tplBundle.js')).pipe(gulp.dest('./'))
}

function walk(dir, filter) {
  var results = []
  fs.readdirSync(dir).forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file, filter))
    } else {
      filter(file) && results.push(file)
    }
  });
  return results
}

