
console.log('Current directory: ' + process.cwd());
console.log(process.argv);
console.log(process.execPath);
console.log(process.env);  // 一个包含了用户的环境变量的对象
console.log(process.version);
console.log(process.versions); // 这个属性曝露出了node和node的依赖库的版本.
console.log(process.config);
console.log(process.pid);  // 进程的pid属性.
console.log(process.title); // 设置或者获取在使用ps命令时显示的名称.
console.log(process.arch); // 你正在使用的处理器类型,例如:'arm','ia32'or'x64'.
console.log(process.platform); // 你正在使用的平台,例如:'darwin','freebsd','linux','solaris'or'win32'.
console.log(process.memoryUsage()); // 返回一个node通过bytes测试的内存用法的表述的对象.

process.nextTick(function () {
    // 在事件循环的下次循环中执行callback.这不是一个简单的setTimeout(fn,0)的别名.它的效率要高很多.
  console.log('nextTick callback');
});

console.log(process.uptime()); // 返回一个数字,代表当前node已经运行的时间.


var t = process.hrtime();
setTimeout(function () {
  t = process.hrtime(t);
  console.log('benchmark took %d seconds and %d nanoseconds', t[0], t[1]);
  // benchmark took 1 seconds and 6962306 nanoseconds
}, 1000);


function noOp() {}
//退出进程时,重置操作
function Cleanup(callback) {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp;
  process.on('cleanup',callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    //console.log(e.stack);
    process.exit(99);
  });
}

