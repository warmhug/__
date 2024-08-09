// node ./node.js

var fs = require('fs');
var http = require('http');
// const glob = require('glob');
const os = require('os');

console.log(os.homedir());
console.log(process.env.HOME, process.env.HOMEPATH, process.env.USERPROFILE);
console.log(process.argv, process.execPath, process.version, process.uptime());
console.log('Current directory: ', process.cwd(), __dirname);

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

var arr = [];
[os.homedir() + '/Downloads'].forEach(function (appPath) {
  var temp = walk(appPath, function(file) {
    return /\.html$/.test(file)
  });
  arr = arr.concat(temp)
});
console.log('arr: ', arr);

fs.readFile('./node.js', 'utf8', function (err, data) {
  console.log('读取成功');
});

process.nextTick(function () {
  // 在事件循环的下次循环中执行callback.这不是一个简单的setTimeout(fn,0)的别名.它的效率要高很多.
  console.log('nextTick callback');
});

process.on('cleanup', function noOp() {});

// do app specific cleaning before exiting
process.on('exit', function () {
  process.emit('cleanup');
});

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  process.exit(2);
});

//
http.createServer(function (req, res) {
  var query = require('url').parse(req.url).query;
  var parm1 = require('querystring').parse(query).parm1 || './node.js';
  console.log(req.url, query);

  function run1 () {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //模拟一个长计算
    for (var i = 0; i < 10; i++) {
      res.write(i.toString() + '...');
    }
    //模拟一个超时
    setTimeout(function () {
      fs.readFile(parm1, 'utf-8', function (err, data) {
        if (err) {
          // res.write('error');
          res.end(err.toString());
        } else {
          res.end(data);
        }
      })
    }, 2000);
  }
  // return run1();

  return fs.stat(parm1, function (err, stats) {
    console.log('stat: ', err, stats);
    if (err) {
      res.writeHead(404);
      res.write('Bad request 404\n');
      return res.end();
    } else if (stats.isFile()) {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;

      // 创建文件流读取，替代fs.readFile方法
      var file = fs.createReadStream(parm1);
      file.on('open', function () {
        return file.pipe(res);
      });
      return file.on('error', function (err) {
        return console.log(err);
      });
    } else {
      res.writeHead(403);
      res.write('Directory access is forbidden');
      return res.end();
    }
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337?file=node.js');
