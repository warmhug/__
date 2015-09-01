

1、http://www.css88.com/archives/tag/localstorage

sessionStorage 和 localStorage的clear()函数的用于清空同源的本地存储数据，比如localStorage.clear()，它将删除所有同源的本地存储的localStorage数据，而对于Session Storage，它只清空当前会话存储的数据。

关闭页面会导致 sessionStorage 的数据被清除，但刷新或重新打开新页面数据还是存在，如果需要存储的只是少量的临时数据。我们可以使用sessionStorage 。或者做页面间的小交互。

关闭浏览器（或标签页）后数据就不存在了。但刷新页面或使用“前进”、“后退按钮”后sessionStorage仍然存在。


2、http://www.cnblogs.com/xiaowei0705/archive/2011/04/19/2021372.html

需要注意的是，HTML5本地存储只能存字符串，任何格式存储的时候都会被自动转为字符串，所以读取的时候，需要自己进行类型的转换。这也就是上一段代码中parseInt必须要使用的原因。

另外，在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误，这时一般在setItem之前，先removeItem()就ok了。