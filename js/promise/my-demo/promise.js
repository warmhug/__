/****************************************************

*****************************************************/

var Promise = function () {

};

Promise.when = function () {

    //var args = Array.prototype.slice.call(arguments, 0);

    // unpacking arguments by hand benchmarked faster  -- flightjs
    var l = arguments.length;
    var args = new Array(l);
    for (var i = 0; i < l; i++) args[i] = arguments[i];


    var len = args.length,
        promise = new Promise();
    promise.datas = [];
    promise.size = len;
    for (var i = 0; i < len; i++) {
        args[i].then(function (data) {
            console.log(data);
            promise.datas.push(data);
            if (promise.datas.length == len) {
                promise.resolve(promise.datas, len, 'from_when');
            }
        })
    }
    return promise;

};

Promise.prototype.then = function (onResolved, onRejected) {
    this.onResolved = onResolved;
    this.onRejected = onRejected;
};

Promise.prototype.resolve = function () {
    this.resolve_flag = true;

    var len = arguments.length;
    if (len == 1) {
        this.onResolved(arguments[0]);
    } else if (len == 3 && 'from_when' == arguments[2]) {
        this.onResolved.apply(this, arguments[0]);
    }
    
};

Promise.prototype.reject = function (error) {
    this.reject_flag = true;
    this.onRejected(error);
};