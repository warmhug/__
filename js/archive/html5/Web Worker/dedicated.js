/* File Created: 二月 27, 2012 */

//fibonacci数列
var fibonacci = function (n) {
    return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
};
onmessage = function (event) {
    var n = parseInt(event.data, 10); // string转化为number类型，传过来的值均为string类型。
    postMessage(fibonacci(n)); //向主页面发送消息
};
close();  // 停掉worker，浏览器有差异（opera下会打印错误消息，其他浏览器没反应）


