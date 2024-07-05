
var util = require('util');
var fs = require('fs');

//fs.readFile('./test.txt', 'utf8', function (err, data) {
//    console.log(data);
//});
//fs.writeFile('./test.txt', 'Hello World', function (err) {
//    if (err) throw err;
//    console.log('File write completed');
//});

// fs.unlinkSync('./a/b.txt');
// console.log('successfully deleted ');

// var file = fs.createReadStream('./test.txt', { flags: 'r' });
// var out = fs.createWriteStream('./test1.txt', { flags: 'w' });
// file.pipe(out);

console.log('Current directory: ', process.cwd(), __dirname);

const glob = require('glob');
glob(__dirname + '/**/*.html', {}, (err, files)=>{
  console.log(files)
})

fs.realpath('./etc/passwd', function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
});

fs.exists('./etc/passwd', function (exists) {
  util.debug(exists ? "it's there" : "no passwd!");
});
