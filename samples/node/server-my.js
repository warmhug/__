var http = require('http');
var url = require('url');
var fs = require('fs-extra');
var path = require('path');
var static = require('node-static');
var probe = require('probe-image-size');
var through2 = require('through2')

var excludeDirFilter = through2.obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) this.push(item)
  next()
})

var port = 9998;
var jsonContentType = 'application/json; charset=utf-8';

var enumExts = ['jpg', 'jpeg', 'gif', 'png'];
var local1 = '/Users/hua/Downloads/Test\ Dir/test.txt';
var local2 = '/Users/hua/Downloads/Test\ Dir/subdir';

function handleJoke2(res) {
  var items = [];
  var dirName;
  // fs.walk(local2).pipe(excludeDirFilter).on('data', function (item) {
  fs.walk(local2).on('data', function (item) {
    // 过滤掉 子目录 内容
    if (item.stats.isDirectory() && item.path !== local2) {
      dirName = item.path;
      // console.log(item.path)
    }
    if (item.path.indexOf(dirName) === 0) {
      return;
    }
    var fileDir = item.path;
    var extname = path.extname(fileDir);
    var ext = extname && extname.substr(1);
    if (ext && enumExts.indexOf(ext) > -1) {
      items.push({ url: 'http://localhost:' + (port - 1) + '/' + path.basename(fileDir),
        width: probe.sync(fs.readFileSync(fileDir)).width });
    }
  }).on('end', function () {
    // console.log(items)
    if (items.length) {
      res.writeHead(200, {'Content-Type': jsonContentType});
      res.end(JSON.stringify(items));
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }
  })
}

http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var query = parsedUrl.query;

  if (query.joke == '1') {
    // 设置 json 类型
    // var content = fs.readFileSync(local1).toString().split('\n\n');
    // response.writeHead(200, {'Content-Type': jsonContentType});
    // response.end(JSON.stringify(content));
    response.end(fs.readFileSync(local1).toString());
  }
  if (query.joke == '2') {
    handleJoke2(response);
  }
}).listen(port);

// Server Specific picture, e.g. http://localhost:9997/_bizhi5.jpg
var file = new static.Server(local2, { cache: 72, headers: {'X-Hello':'World!'} });
http.createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response, function (err, res) {
      if (err) { // An error as occured
        console.error("> Error serving " + request.url + " - " + err.message);
        response.writeHead(err.status, err.headers);
        response.end();
      } else {
        console.log("> " + request.url + " - " + res.message);
      }
    });
  }).resume();
}).listen(port - 1);

console.log('> main server running on port ' + port);
console.log('> static server running on port ' + (port - 1));

