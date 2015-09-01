# js


    // if的条件为空的判断：`null、undefined、\t\n\f、字符串空值`等几种情形
    function isBlank(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    }


    //[underscore.string.js](https://github.com/epeli/underscore.string)

    _(' \n\t').isBlank(); // => true

    _.numberFormat(123456789.123, 5, '.', ',')  // => "123,456,789.12300"

    _('Hello world').count('l') // => 3

    _('<div>Blah blah blah</div>').escapeHTML(); // => '&lt;div&gt;Blah blah blah&lt;/div&gt;'

    _('&lt;div&gt;Blah blah blah&lt;/div&gt;').unescapeHTML();  //=> '<div>Blah blah blah</div>'



    {
        now: Date.now || function () {
          return +new Date();
        }
    }

    var generateChars = function (length) {
        var chars = '';
        for (var i = 0; i < length; i++) {
          var randomChar = Math.floor(Math.random() * 36);
          chars += randomChar.toString(36);
        }
        return chars;
    }



    function xhr(url) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          // Success!
          console.log(xhr.responseText);
        } else {
          // We reached our target server, but it returned an error
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    }

## 数组相关

    //生成 重复数据 的数组
    Array.apply(null, new Array(10)).map(function(){return 5})

    _.times(5, _.constant(2));



    //合并数组  -- 类似concat功能、但concat返回值是一个新的数组。
    Array.prototype.push.apply(array1, array2);
    Array.prototype.unshift.apply(arr1, arr2)
    console.log(array1);


    // 数组去重
    function unique(arr) {
      var a = {}, b = {}, c = [];
      for (var i = 0; i < arr.length; i++){
        if (!b[a[i]]) {
	        c[c.length] = arr[i];
	        b[a[i]] = true;
        }
      }
      return c;
    }


    //将 类数组的对象(如arguments、nodeLists)转换成 数组
    Array.prototype.slice.call(arguments);


    //获取一个数字数组中的最大值或最小值
    Math.max.apply(Math, numbersArr);


    // 排序
    var arr = [3,324,5345,6546,134,5654,665];
    arr.sort( function(a,b){ return a-b; } );  


    // 乱序：让比较函数随机传回-1或1就可以了（这样乱序效率不高）
    var arr=[1,2,3,4,5,6,7,8,9,10,22,33,55,77,88,99];
    arr.sort( function(){ return Math.random() > 0.5 ? -1 : 1; } );




## 字符串操作


    处理查询字符串如 '?a=1&b=2' :
    angular.js里 parseKeyValue、toKeyValue 方法

    // 获取url的查询参数
    $.urlParam = function(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }


    //trim
    String.prototype.trim = function(){
        return this.replace( /(^\s*)|(\s*$)/g , "");
    }
    String.prototype.ltrim = function(){
        return this.replace(/(^\s*)/g,"");
    }
    String.prototype.rtrim = function() {
        return this.replace(/(\s*$)/g,"");
    }



    //获取字符串长度，截取字符串
    /**
     * @param {string} str 要获取长度的字符串
     * return  单字节长度
     */
    var getStrSize = function (str) {
        var size = 0;
        for (var i = 0, len = str.length; i < len; i++) {
            if (str.charCodeAt(i) > 255) {
                size += 2;
            } else {
                size++;
            }
        }
        return size;
    };

    /**
     * @param {string} str 要截取的字符串
     * @param {number} size 截取长度(单字节长度)
     * @返回原字符串 或 截取的字符串+...
     */
    var curSize = 0, arr = [];
    var subStr = function (str, size/*单字节长度*/) {
        for (var i = 0, len = str.length; i < len; i++) {
            arr.push(str.charAt(i));
            if (str.charCodeAt(i) > 255) {
                curSize += 2;
                if (size === curSize || size === curSize - 1) {
                    arr.pop();
                    return arr.join('') + '...';
                }
            } else {
                curSize++;
                if (size === curSize) {
                    arr.pop();
                    return arr.join('') + '...';
                }
            }
        }
        if (curSize < size) { // 当str长度小于规定长度时，直接返回str
            return str;
        }
    };
	var str = '#%*……&#什么东西 word the time 1234abcd 还不够gh 好了就这样吧';
	alert(str.length);
	alert(getStrSize(str));
	alert(str.substr(0, 15));
	alert(subStr(str, 15));




## html转义/反转


    //转义 -- 注意：IE8及以下，对于\n \f等非打印字符不准确
    var htmlEncode = function(str){
	    var div = document.createElement("div");
	    div.appendChild(document.createTextNode(str));
	    return div.innerHTML.replace(/\&lt;br\/\&gt;/g,"<br/>");
    }

    //反转
    $('<textarea />').html("&lt; Chris&apos; corner &gt;").text();



    window.helpers = {
        '$escape': function (content) {
            return typeof content === 'string' ? content.replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
                return {
                    "<": "&#60;",
                    ">": "&#62;",
                    '"': "&#34;",
                    "'": "&#39;",
                    "&": "&#38;"
                }[s];
            }) : content;
        },
        '$unescape': function (content) {
            return typeof content === 'string' ?
                content.replace(/&amp;/g, '&').
                        replace(/(&lt;)|(&#60;)/g, '<').
                        replace(/(&gt;)|(&#62;)/g, '>').
                        replace(/(&quot;)|(&#34;)/g, '"').
                        replace(/(&apos;)|(&#39;)/g, '\'') : content;
        },
        '$string': function (value) {
            if (typeof value === 'string' || typeof value === 'number') {
                return value;
            } else if (typeof value === 'function') {
                return value();
            } else {
                return '';
            }
        }
    };



### 字符串中重复字符的统计

    // 方法一：
    var count1 = function (str) {
        var t = str.split("")
          .sort()
          .join("")
          .replace(/((.)\2*)/g, "$1,")
          .split(",")
          .sort(function (a, b) { return b.length - a.length });
        return "字符：" + t[0][0] + "次数：" + t[0].length;
    }

    //方法二：键-值的思考方法，数组的索引作为“字符”，该索引下的数组值作为“字符个数”
    var count2 = function (str) {
	    var map = {}, maxCount = 0, maxChar, undefined, i = str.length;
	    while (i--) {
	        var t = str.charAt(i);
	        map[t] == undefined ? map[t] = 1 : map[t] += 1;
	        if (map[t] > maxCount) {
	            maxChar = t;
                maxCount = map[maxChar];
            }
        }
        return "字符：" + maxChar + "次数：" + maxCount;
    }


## 动态向head里插入script
    function load_script(url, callback) {
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
        script.async = 'async';
	    script.type = 'text/javascript';
	    script.onload = script.onreadystatechange = function () {
	        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
	            callback && callback();
	            // Handle memory leak in IE
	            script.onload = script.onreadystatechange = null;
				if ( head && script.parentNode ) {
					head.removeChild( script );
				}
	        }
	    };
	    script.src = url;
	    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
		head.insertBefore( script, head.firstChild );
    }
    load_script('http://www.rutuanba.com/js.js', function(){alert('loaded')});
	  //如果用ajax返回的html代码中包含script，则直接用innerHTML插入到dom中是不能使html中的script起作用的。



## [function currying](http://en.wikipedia.org/wiki/Currying)
    var $bind = function (fn, context) {
        var slice = Array.prototype.slice, args = slice.call(arguments, 2);
        return function () {
            return fn.apply(context, args.concat(slice.call(arguments)));
        }
    }
    var handler = function (x, y) {
        console.log(x, y);
    }
    var argh = $bind(handler, undefined, 5, 10);
    $('#d').on('click', argh);

    // 参考对比：
    // Function.prototype.bind  
    // angular.js的angular.bind()



## extend
    //浅复制
    function extend(destination, source){
        var value    = null;
        var property = null;
        if (destination && source) {
            for (property in source) {
                value = source[property];
                if (value !== undefined) {
                    destination[property] = (typeof(value) == 'object' && !(value.nodeType) && !(value instanceof Array)) ? extend({}, value) : value;
                }
            }
            if (source.hasOwnProperty && source.hasOwnProperty('toString')) {
                destination.toString = source.toString;
            }
        }
        return destination;
    }

    //深复制
    function deepExtend(destination, source) {
        for (var property in source) {
            var copy = source[property];
            if (destination === copy) {
			     // destination作为source的一个属性的时候
                continue;  
            }
            if (typeof copy === "object") {
                destination[property] = arguments.callee(destination[property] || {}, copy);
            } else {
                destination[property] = copy;
            }
        }
        return destination;
    }



## 有用

    今天凌晨零点：new Date(now.getFullYear(), now.getMonth(), now.getDate())
    一年后：new Date(new Date().setYear(new Date().getFullYear() + 1))

    for (var name in object) {
        if (object.hasOwnProperty(name)) {
            // do something with name
        }
    }

    //阻止默认事件
    a href="javascript:;"  推荐
    a href="javascript:void(0);" IE6


    //判断弹出窗口是否被屏蔽
    var blocked = false;
    try {
        var wroxWin = window.open("http://www.w3cmm.com", "_blank");
        if (wroxWin == null) {
            blocked = true;
        }
    } catch (ex) {
        blocked = true;
    }
    //如果是浏览器内置的屏蔽程序阻止的弹出窗口，那么window.open()很可能返回null
    //如果浏览器扩展或其它程序阻止的弹出窗口，那么window.open()通常会抛出一个错误。



    // createObject方法
    var createObject = ('__proto__' in {}) ?
    function (obj) { return obj; } :
    function (obj) {
        var proto = obj.__proto__;
        if (!proto) {
            return obj;
        }
        var newObject = Object.create(proto);
        Object.getOwnPropertyNames(obj).forEach(function (name) {
            Object.defineProperty(newObject, name,
                Object.getOwnPropertyDescriptor(obj, name));
        });
        return newObject;
    };




    //isEqual 全等
    var isEqual = Object.is || function (v1, v2) {
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2
        } else if (v1 !== v1) {
            return v2 !== v2
        } else {
            return v1 === v2
        }
    };

    function isIndex(s) {
        return +s === s >>> 0;
    }

    function toNumber(s) {
        return +s;
    }

    function isObject(obj) {
        return obj === Object(obj);
    }




    //清除选中效果
    function clearSelection() {
	    if (document.selection && document.selection.empty) {
	        document.selection.empty();
	    } else if (window.getSelection) {
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	    }
    }



    //handleEvent绑定事件
    var pro={
        init:function(){
            this.element = document.getElementsByTagName('body')[0];
            if (this.element.addEventListener) {
                this.element.addEventListener('click', this, false);
                window.addEventListener('resize', this, false);
            }
        },
        handleEvent: function(e) {
            switch (e.type) {
                case 'click': this.click(); break;
            }
        },
        click:function(e){
            console.log(this, 'a');
        }
    };
    pro.init();




    //获取css前缀   https://github.com/x-tag/x-tag
    var prefix = (function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    })();



    // securityPolicy检测
    function detectEval() {
        // don't test for eval if document has CSP securityPolicy object and we can see that
        // eval is not supported. This avoids an error message in console even when the exception
        // is caught
        if (global.document &&
            'securityPolicy' in global.document && !global.document.securityPolicy.allowsEval) {
            return false;
        }
        try {
            var f = new Function('', 'return true;');
            return f();
        } catch (ex) {
            return false;
        }
    }
    var hasEval = detectEval();




## [angular-1.0.6](https://code.angularjs.org/1.0.6/angular.js)源码摘录

### event对象

    //AngularJS v1.0.6   1972--1987行

    if (!event.preventDefault) {
      event.preventDefault = function() {
        event.returnValue = false; //ie
      };
    }
    if (!event.stopPropagation) {
      event.stopPropagation = function() {
        event.cancelBubble = true; //ie
      };
    }
    if (!event.target) {
      event.target = event.srcElement || document;
    }

    // Remove monkey-patched methods (IE),
    // as they would cause memory leaks in IE8.
    if (msie <= 8) {
      // IE7/8 does not allow to delete property on native object
      event.preventDefault = null;
      event.stopPropagation = null;
      event.isDefaultPrevented = null;
    } else {
      // It shouldn't affect normal browsers (native methods are defined on prototype).
      delete event.preventDefault;
      delete event.stopPropagation;
      delete event.isDefaultPrevented;
    }


### history api 和 hashchange 检测

    //AngularJS v1.0.6   8319行

    function $SnifferProvider() {
      this.$get = ['$window', function($window) {
        var eventSupport = {},
            android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);

        return {
          // Android has history.pushState, but it does not update location correctly
          // so let's not use the history API at all.
          // http://code.google.com/p/android/issues/detail?id=17471
          // https://github.com/angular/angular.js/issues/904
          history: !!($window.history && $window.history.pushState && !(android < 4)),
          hashchange: 'onhashchange' in $window &&
                      // IE8 compatible mode lies
                      (!$window.document.documentMode || $window.document.documentMode > 7),
          hasEvent: function(event) {
            // IE9 implements 'input' event it's so fubared that we rather pretend that it doesn't have
            // it. In particular the event is not fired when backspace or delete key are pressed or
            // when cut operation is performed.
            if (event == 'input' && msie == 9) return false;

            if (isUndefined(eventSupport[event])) {
              var divElm = $window.document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }

            return eventSupport[event];
          },
          // TODO(i): currently there is no way to feature detect CSP without triggering alerts
          csp: false
        };
      }];
    }

### http cache
    // AngularJS v1.0.6   8634行

### input text输入事件监听
    // AngularJS v1.0.6   11446--11470行







# css

## table相关：

### [固定单元格宽度](http://stackoverflow.com/questions/4185814/fixed-table-cell-width)

    table.fixed { table-layout:fixed; }
    table.fixed td { overflow: hidden; }
    <table class="fixed">
        <col width="20px" />
        <col width="30px" />
        <col width="40px" />
        <tr>
            <td>text</td>
            <td>text</td>
            <td>text</td>
        </tr>
    </table>

    table.fixed {table-layout:fixed; width:90px;}/*Setting the table width is important!*/
    table.fixed td {overflow:hidden;}/*Hide text outside the cell.*/
    table.fixed td:nth-of-type(1) {width:20px;}/*Setting the width of column 1.*/
    table.fixed td:nth-of-type(2) {width:30px;}/*Setting the width of column 2.*/
    table.fixed td:nth-of-type(3) {width:40px;}/*Setting the width of column 3.*/
    <table class="fixed">
        <tr>
            <td>text</td>
            <td>text</td>
            <td>text</td>
        </tr>
    </table>

### 模拟table样式

    .table{
      display: table;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .row{
      display: table-row;
    }
    .cell{
      display: table-cell;
      vertical-align: top;
      height: 50px;
      /* cell高度会被内容高度撑开，设置内容的最大高度可解决 */
      .div{
        max-height: 100px;
        overflow: hidden;
      }
    }


## 常用

连续输入的英文字母，不会断行！需要截断文字

    a,span,em{ word-wrap:break-word; }


清除浮动：

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .clearfix{*zoom:1;}
    /* .clearfix {display: inline-block;}   这里触发了BFC；可以改用 .clear{*zoom:1;}  实现的更好
    参考：[清除浮动总结](http://www.iyunlu.com/view/css-xhtml/55.html)
    */


单行文本省略号：

    .simpline_ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
    }  

多行文本省略号：

    .multiline_ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 12;
        -webkit-box-orient: vertical;
    }


IE9+ 水平垂直居中：

    .center-vertical {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    .center-horizontal {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }



实时编辑css ：

    <style style="display:block" contentEditable>
          body { color: blue }
    </style>


display box 相关属性：  

    -webkit-box-flex:1;  
    -webkit-box-pack: start | center | end | justify;
    -webkit-box-align: start | center | end | baseline | stretch;  
    -webkit-box-orient: horizontal | vertical | inline-axis | block-axis | inherit；  
    -webkit-box-direction: normal | reverse | inherit


创建长宽比固定的元素  
> 通过设置父级窗口的padding-bottom可以达到让容器保持一定的长度比的目的，这在响应式页面设计中比较有用，能够保持元素不变形。

    <div style="width: 100%; position: relative; padding-bottom: 20%;">
        <div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;">
            this content will have a constant aspect ratio that varies based on the width.
        </div>
    </div>


右箭头：

    .arrow{
        //position:absolute;
        display:inline-block;
        font-size: 0;
        border-top: 3px solid #666;
        border-left: 3px solid #666;
        width: 6px;
        height: 6px;
        background-color: transparent;
        -webkit-transform: rotate(135deg);
    }


focus::

    input:focus::-webkit-input-placeholder { color: transparent; } /*chrome中placeholder内容默认不是focus消失，而是输入时消失*/
      textarea:focus::-webkit-input-placeholder { color: transparent; }
      :focus { outline: 0; }
