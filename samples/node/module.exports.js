/**
 * module.exports 和 exports
 */

exports.hello = function (name) {
    console.log( "Hello test go " + name );
};
exports.property = "blue";

// 只导出一个函数或对象
module.exports = function (n) { return n * 1000 }
// module.exports = {};
// module.exports.beep = function (n) { return n }
// module.exports.boop = 555


// 不能这么写
// exports = xxx
// 原理： how modules work in the background:
var module = {
  exports: {}
};
(function(module, exports) {
  // 错误、不工作。因为 exports 只是个初始时指向 module.exports 对象的变量，给它设置新值后它就指向了新地方，
  // 而并没有改变 module.exports 这个初始时指向的对象。
  exports = function (n) { return n * 1000 };
}(module, module.exports));
console.log(module.exports); // it's still an empty object 