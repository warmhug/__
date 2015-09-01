
# 基础


## html标签使用注意点
- [div和span都是作为容器元素](http://www.w3.org/wiki/Generic_containers_-_the_div_and_span_elements)
- p标签里不能有块(block)标签，否则<p>标签会提前结束导致解析错误，也会连环导致其他标签解析错误
- `<select>` is inline by default
- span标签里可以放几乎任何标签？
- a标签带href并不为空，按enter键都会触发其上的click事件，否则不会触发！

## 键盘、可访问性

- [键盘聚焦并可点击](http://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/)
- [aria](http://www.paciellogroup.com/blog/2010/04/html5-and-the-myth-of-wai-aria-redundance/)
- [WAI-ARIA](http://www.w3.org/TR/wai-aria/usage#managingfocus)
- [aria-hidden and role="presentation"](http://asurkov.blogspot.com/2012/02/aria-hidden-and-rolepresentation.html)

## 浏览器渲染
当浏览器从服务器接收到了HTML文档，并把HTML在内存中转换成DOM树，在转换的过程中如果发现某个节点(node)上引用了CSS或者 IMAGE，就会再发1个request去请求CSS或image，然后继续执行下面的转换，而不需要等待request的返回，当request返回后，只需要把返回的内容放入到DOM树中对应的位置就OK。
但当引用了JS的时候，浏览器发送1个js request就会一直等待该request的返回。因为浏览器需要1个稳定的DOM树结构，而JS中很有可能有代码直接改变了DOM树结构，浏览器为了防止出现JS修改DOM树，需要重新构建DOM树的情况，所以就会阻塞其他的下载和呈现。

结论：在head里面尽量不要引入javascript，如果要引入js 尽量将js内嵌，把内嵌js放在所有css的前面(否则会打断css或图片的并行下载)。

## design
- [materialup](http://www.materialup.com/)
- [materialpalette](http://www.materialpalette.com/)
- [bootstrap-material-design](http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html)
- []()

## 其他

[等宽字体（Monospaced Font）](http://zh.wikipedia.org/wiki/%E7%AD%89%E5%AE%BD%E5%AD%97%E4%BD%93)

    编码和字符集的区别：gbk、utf-8都是字符集。
    http数据传输时的编码和界面显示使用的的字符集的区别。

    <meta charset="utf-8" /> 要置于 <title>标题</title> 之前，
    能使得浏览器先获得编码设置，来正确解析页面中文本内容。（不然，老IE浏览器可能会有问题）

浏览器在自动选择编码方式的时候不会优先根据html源码中的所展示的`<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />`代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。（老IE浏览器相反）


html特殊字符：[HTML特殊字符大全](http://www.qianduan.net/html-special-characters-daquan.html)、[显示](http://www.sjyhome.com/html/html-special-characters.html)


- 页面拥有ID的元素会自动创建全局变量，会不会导致JS问题？
- 浏览器地址栏输入以下代码：
    - `javascript:alert('hello from address bar :)’);`
    - `data:text/html,<h1>Hello, world!</h1>`
    - `data:text/html, <html contenteditable>`

- repaint：当某元素在不改变布局、发生显示/隐藏的变化时，就会发生repaint。  
- reflow：当DOM以一种影响到布局的方式进行操作时，会触发reflow。  
    - 例如，样式改变影响了布局、className改变、浏览器窗口大小改变、插入一个新元素、改变DOM节点的文本、新增一个元素属性，等等对DOM修改的行为都会触发reflow
    - 通过 getComputedStyle、offsetWidth、scrollWidth、clientWidth等属性获取元素的尺寸或位置，会被强行触发reflow。因此多个style变化可通过设置一次className完成
    - 当元素reflow时，他的子结点和其后的任何元素也会reflow，最后所有元素进行repaint
- 减少reflow的方法：
    - 将多个元素改变都在DOMDocumentFragment中进行，然后用一次操作将元素片段放到DOM中，这样只触发一次reflow
    - 要在元素上做动画应该设置position:absolute或position:fixed,他们只会引发一个repaint而不是全部reflow。
    - 通过scrollTo()进行原生滚动，性能显著，因为没有触发reflow。

- 判断文档是标准模式还是怪异模式：`window.top.document.compatMode`
- 禁止别人以iframe加载你的页面: `if (window.location != window.parent.location) window.parent.location = window.location;`

- [网页渲染过程：Repaint和Reflow](http://frontendbabel.info/articles/webpage-rendering-101/)
- [W3C HTML JSON form submission](http://www.w3.org/TR/2014/WD-html-json-forms-20140529/)

- img script的src、css的href 都不能为空，否则会有个指向本页面的请求
- id、class选择器被标签选择器限制，都是多余的。
- css浏览器私有属性在前面， W3C标准属性在后面，Hack属性在更后面。
- z-index 属性仅在节点的 position 属性为 relative, absolute 或者 fixed 时生效.
- 元素嵌套：
    - ul和ol的子元素不能是别的元素只能是li，不能是别的比如div等（ie6会有问题）。
    - p标签不能嵌套块级元素，button里面不要嵌套a标签。
    - dt标签里面不能嵌套块级元素，只能嵌套内联元素，dd可以。
- Do not use quotation marks in URI values (url()).
- css2.1的counter-increment，详见[使用](http://onwebdev.blogspot.com/2012/02/css-counters-tutorial.html)。  


# css
- [Scalable and Modular Architecture for CSS](http://smacss.com/book/)
- [Google HTML/CSS Style Guide](http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml)
- [css3generator](http://css3generator.com/)
- [综合](http://demo.doyoe.com/#inline-block-space)：Web前端实验室用于存放CSS探索之旅的实验和测试用例(Demos and Examples)
- [media type与media query](http://www.qianduan.net/media-type-and-media-query.html)

## 组织css
- [BEM命名方式](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- [css命名、组织方式](http://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/)
- [值得参考的css理论：OOCSS、SMACSS与BEM](http://segmentfault.com/blog/yardtea/1190000000704006)
- css与js完全分离
    - 用 J_ 或 j- 做js钩子， **专用于** js中的样式名或id， **不附加** 任何css样式。达到 js css 完全分离
- class的命名
    - 根据系统名加前缀，例如partnerprod系统，可以叫 pp-xxx 。(bs等第三方库的样式名不限制)

## css写法
- [如何提升 CSS 选择器性能](http://www.jianshu.com/p/268c7f3dd7a6)
- [理解css时间函数](http://www.smashingmagazine.com/2014/04/15/understanding-css-timing-functions/)
    - [贝塞尔曲线](http://cubic-bezier.com/#.42,0,.28,1.03)
- [css浮动](http://paranimage.com/css-float-attribute/)

## icon font
- [icon font介绍、制作](http://www.qianduan.net/css3-icon-font-guide.html)
- [Font-Awesome](http://fortawesome.github.io/Font-Awesome/)
- [livicons](http://livicons.com/)
- [css-gui-icons](http://nicolasgallagher.com/pure-css-gui-icons/)
- [one-div](http://one-div.com/)
