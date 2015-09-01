
## promise 

- [es6-promises](http://www.html5rocks.com/zh/tutorials/es6/promises/)
- [promise使用问题](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)


### 简要实现 

文件：my-demo/promise.js ， 只做原理演示用，不完善。

- [Lightweight javascript implementation of promises](https://github.com/stackp/promisejs)

### 生产环境 

建议使用 [q](https://github.com/kriskowal/q) 。因为它是commonjs中的[Promises/A](http://wiki.commonjs.org/wiki/Promises/A)规范的相对完善的实现，并且能[转换](https://github.com/kriskowal/q/wiki/Coming-from-jQuery)jquery中的ajax promise为自己所用，还支持服务端的node使用。

文件夹：q-demo 里的演示demo，来自于官方推荐的[example](https://github.com/kriskowal/q/wiki/Examples-Gallery)：  
[wait-for-multiple-promises.js](https://github.com/basicallydan/q-examples/blob/master/wait-for-multiple-promises.js)、
[flickrApi.js](https://gist.github.com/domenic/2626708)(代码中ViewModel写法挺不错)


### q源码借鉴 

- 重写valueOf
- void 0、value === Object(value)
- uncurryThis (http://jsperf.com/uncurrythis)
- ES6Generators
