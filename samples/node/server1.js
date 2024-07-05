/**
 *  带mime检测的不完善静态服务器
 */
var base, fs, http, mime, url;
http = require('http');
url = require('url');
fs = require('fs');
mime = require('mime');
base = './';

http.createServer(function (req, res) {
    var pathname = base + req.url;
    console.log(pathname);
    return fs.stat(pathname, function (err, stats) {
        var file, type;
        if (err) {
            res.writeHead(404);
            res.write('Bad request 404\n');
            return res.end();
        } else if (stats.isFile()) {
            type = mime.lookup(pathname);
            console.log(type);
            res.setHeader('Content-Type', type);
            res.statusCode = 200;

            //创建文件流读取，替代fs.readFile方法
            file = fs.createReadStream(pathname);
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
}).listen(8124);

console.log('Server running at 8124/');
