
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var query = require('url').parse(req.url).query;
    var app = require('querystring').parse(query).file + '.txt';

    res.writeHead(200, {'Content-Type': 'text/plain'});

    //模拟一个长计算
    for (var i = 0; i < 10; i++) {
        res.write(i.toString() + '...');
    }

    //模拟一个超时
    setTimeout(function () {
        console.log( 'opening ' + app ); //undefined.txt 为 favicon.ico文件的请求
        fs.readFile(app, 'utf-8', function (err, data) {
            if(err) res.write('error');
            else {
                res.end(data);
            }
        })
    }, 2000);

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');