
# form相关：

## 知识点：

### get、post区别
- 获取数据用get，get速度快、有长度限制
    - get只能向服务器发送ASCII字符，这是W3C组织规定的，所以任何参数最后都要以ASCII码的形式传递，不能有中文字符。
    - get编码方式是根据当前网页采用选择的编码来编码。所以，当前网页如果是gbk编码，get的参数也会被编码为gbk，用`decodeURI()`或`decodeURIComponent()`(它们都是解utf-8编码的) 解码就会出现js异常抛错。
    - 对于要拼接到uri后面的中文参数进行encodeURIComponent或者encodeURI编码处理，因为encodeURIComponent或者encodeURI就是utf-8的编码方法，后端处理参数的解码方式一般也都是utf-8方式，这样不会出现后端获取中文乱码情况。
    - 浏览器发送数据给服务器时，会把数据进行浏览器编码成字节流

- 提交数据用post，post慢、理论上无长度限制(服务器端可能会规定最大长度)，post相对安全

### form的method、action、target、enctype
- method 默认值为get
- action 属性表示 向何处发送表单数据 (一般为url)。
    - 如果不设置、或为空，则提交到本页面
    - 如果get方式提交、action url中参数都会被丢弃；post则不会

- target 属性规定在何处打开 action URL
    - 值可为：_self(默认值) | _blank |  _parent |  _top  | framename
    - 当设置为 隐藏的 iframe name 时，能实现假的 表单提交无刷新效果

- enctype 规定在发送表单数据之前如何对其进行编码
    - 设置：application/x-www-form-urlencoded (默认值)，默认对所有字符编码
        - 直接的post提交的数据按照`key1=val1&key2=val2`的方式进行编码，key 和 val 都进行了 URL 转码
        - ajax post提交时， **data 需要用`$.param()`处理成字符串** ，如果某个key对应的val为json，先JSON.stringify(val)，angular下使用angular.toJson能过滤掉$$hashkey。

            ```
            如下：注意 $.param 的使用
            $http({
                method: 'POST',
                url: 'xx.json',
                data: $.param(submitData),  // pass in data as strings
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).success(function (data, status, headers, config) {
                console.log(data);
            })
            ```

    - 设置：multipart/form-data ，使用表单上传文件时，必须让 form 的 enctype 等于这个值
    - 设置：application/json ，发送消息为序列化后的 JSON 字符串，AngularJS 中的 Ajax 功能，默认就是提交 JSON 字符串
    - 其他：text/plain

### 使用 FormData() 对象
> 注意：支持IE10+

FormData 配合 xhr2 能很方便的处理form表单！[介绍](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects)，示例如下：

    //在已有的<form>元素上初始化FormData对象
    var fd = new FormData(document.getElementById("myForm"));

    //生成一个 空的formData对象
    var fd = new FormData();

    //添加 key val(string类型，其他类型自动会被转为string)；
    fd.append("CustomField", "This is some extra data");
    //添加 file文件
    fd.append("fileName", fileInputElement.files[0]);
    //添加 blob对象
    var oFileBody = "<a id="a"><b id="b">hey!</b></a>"; // Blob对象包含的文件内容
    fd.append("blobKey", new Blob([oFileBody], { type: "text/xml"}));

    //jQuery发送请求
    $.ajax({
      url: "stash.php",
      type: "POST",
      data: fd,
      processData: false,  // 告诉jQuery不要去处理发送的数据
      contentType: false   // 告诉jQuery不要去设置Content-Type请求头
    });

> 要注意其append的字段中有些需要encodeURIComponent、但有些不需要。


## 安全
jsonp请求也需要「防止csrf漏洞」，例如可以用jsonp获取通讯录列表

### [csrf漏洞](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)、[wiki](http://en.wikipedia.org/wiki/Cross-site_request_forgery)、[wiki中文](http://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并执行一些操作（如发邮件，发消息，甚至财产操作如转帐和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

When CSRF protection is enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified by either a header or a parameter in the query string or HTTP body.

为防止csrf漏洞，传统表单里默认有生成了随机token的隐藏input，同步提交表单时能自动提交上去，同步提交后刷新页面会再次更新token。

但使用Ajax异步提交时，提交时要从Cookie里(或页面上)获得token值（这里假设攻击者不能获得第三方的Cookie，但用户的Cookie很容易由于网站的XSS漏洞而被盗取），另外要考虑在提交后是否需要手动更新Cookie里(或页面上)的token。

> [ajax里如何更新csrf token](http://www.v2ex.com/t/82751) ，最后的一段评论提到：csrf-token的目的是，让攻击者不能伪造请求（如通过img发起的请求会带上cookie）。因此，csrf-token不需要每个请求都改变，只需要确保对于每个session不一致即可，同一个session内不变没有问题。

#### jQuery、angular中的处理：  
[ jQuery Ajax post提交的csrf token处理 ](https://gist.github.com/alanhamlett/6316427)  
[ jQuery Ajax post提交的csrf token处理1 ](https://coderwall.com/p/cxwg_g)

     $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }
      });
     // 注意：可能需要对Cookie做 encodeURIComponent 处理

[ angular csrf token ](http://stackoverflow.com/questions/18156452/django-csrf-token-angularjs)


------

## form 文件操作
- [如何在web应用程序中使用文件](https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications#Example.3a_Using_object_URLs_to_display_images)
- []()

### jQuery-File-Upload 组件
#### [jquery file upload 后台收到filename中文乱码](http://blog.csdn.net/zhouyingge1104/article/details/38322403)

    formData.append(
        ($.type(options.paramName) === 'array' &&
            options.paramName[index]) || paramName,
        file,
        //file.uploadName || file.name
        encodeURIComponent(file.uploadName || file.name)
    );

#### [在文件对象上如何附加其他input的字段？](https://github.com/blueimp/jQuery-File-Upload/wiki/How-to-submit-additional-Form-Data#adding-additional-form-data-programmatically)

### html5 -- blob、atob、canvas
- [Convert CANVAS data to binary data and then to a filename using a Blob](https://gist.github.com/iwek/7126242)
- 用 new FormData() 或 blob 上传文件时，angular处理的不好，可改用jQuery

### 一些问题：
- 上传文件，后端接收到的 文件名 为 乱码，怎么处理？
- 本地上传的文件编码可能为gbk、utf-8，服务器怎么识别？因为服务端只保存为utf-8类型。
- base64形式提交处理后图片，图片文件大小怎么计算？
- 上传前先压缩文件？以减少上传文件大小，怎么做？
    - 浏览器端被设计为发送简短http请求，浏览器端请求不用压缩，[见此](http://stackoverflow.com/questions/424917/why-cant-browser-send-gzip-request)。
    - 一种办法：客户端安装applet，并相应简单配置，[见此](http://www.radinks.com/upload/plus/compress.php)。
    - 图片上传前压缩[办法](http://blog-en.openalfa.com/javascript-client-side-compression-of-images/)。

### 下载文件：
注意：Ajax不能下载文件。[解释](http://stackoverflow.com/questions/14682556/why-threre-is-no-way-to-download-file-using-ajax-request)。可以用form表单提交下载，或iframe方式下载。

点击需要下载文件的连接，后端处理：`Content-type: application/octet-stream`、`Content-Disposition: filename=\`

- [单纯使用js下载文件](http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery)
- [纯前端-生成文件并下载](http://www.alloyteam.com/2014/01/use-js-file-download/)


-------


## 跨域通信
[详细介绍](http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html)

- xhr1的ajax无论是get或post，都 **不能跨域**
- xhr2有两方面的增强：通信进度通知，跨域通信。它使用[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Simple_requests)，W3C制定的跨站资源分享标准。post前会产生一次options嗅探（称之为preflight，简单请求就不会出现）来确认有否跨域请求的权限；客户端post时会带上Origin头指示来源网站，服务端响应时需带上Access-Control-Allow-Origi头与Origin的值匹配。ie8提供了封装好的XDomainRequest对象，部分实现了该标准；而其它浏览器则提供了XMLHttpRequest（Level 2）对象。
    - cors实例，如下图（options嗅探）：
    - ![cors实例](https://t.alipayobjects.com/images/T1olFfXcpaXXXXXXXX.png)
    - [更多简单使用](http://blog.csdn.net/yuyang7126558/article/details/8229723)

- jsonp跨域：JSONP属于跨域get，其之所以可行是利用了script标签的特性。
    - 实质是script的src里携带向服务器请求的data，返回的data包裹在函数调用里，供数据处理函数使用
    - 只能传4kByte以下的数据？因为ie限制了url的长度为4k ？
- form + iframe(假无刷新)：通过js动态生成不可见表单和iframe，将表单的target设为iframe的name以此通过iframe做post提交。
    - 提交后由于跨域，无法直接读取响应内容。一般的做法是，iframe内通过js改变自身location的fragment，外部则监听iframe的onload事件，读取fragment的内容。
    - iframe的src改变时[事件侦听](http://stackoverflow.com/questions/2429045/iframe-src-change-event-detection)，`<iframe src="zz" onLoad="xx();"></iframe>`
- 设置document.domain，来实现“跨子域”，但有[不好的地方](http://www.cnblogs.com/jkisjk/archive/2013/05/30/change_document_domain.html)
- flash跨域：利用不可见的swf跨域post提交数据，需要部署crossdomain.xml。若用户安装了flash，则以此实现跨域通信。响应数据量较大时优势明显

### 其他方法
- HTML5 postMessage
- document.domain + iframe的设置
- window.name实现的跨域数据传输
- 利用iframe和location.hash，会导致历史记录的产生，且数据量有限，同时，因为 URL 的内容可视，既不好看也容易泄露信息。
- 用服务端代理？ 虽然算是最“正宗”的完整跨域方案，但太麻烦了点——首先得有代理，如果量大的话，代理的负担会很重，会导致“瓶颈”制约。

### postMessage 跨域详解
> ie8及以上浏览器都支持

#### otherWindow.postMessage(message, targetOrigin);

    otherWindow: 对接收信息页面的window的引用。可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。
    message: 所要发送的数据，string类型。
    targetOrigin: 用于限制otherWindow，“*”表示不作限制

#### 示例：
a.com/index.html中的代码：

    <iframe id="ifr" src="b.com/index.html"></iframe>
    <script>
        var ifr = document.getElementById('ifr');
        var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                            // 若写成'http://c.com'就不会执行postMessage了
        ifr.contentWindow.postMessage('I was there!', targetOrigin);
    </script>

b.com/index.html中的代码：

    window.addEventListener('message', function(event){
        // 通过origin属性判断消息来源地址
        if (event.origin == 'http://a.com') {
            alert(event.data);    // 弹出"I was there!"
            alert(event.source);  // 对a.com、index.html中window对象的引用
                                  // 但由于同源策略，这里event.source不可以访问window对象
        }
    }, false);

### 相关
- [跨域iframe的高度自适应](http://www.cnblogs.com/snandy/p/3900016.html)
