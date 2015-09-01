
# 各种

- [famo.us](http://famo.us/)、[js-repaint-perfs](http://leeluolee.github.io/js-repaint-perfs/#)

- [watch.js](https://github.com/melanke/Watch.JS) 、[分析](http://dailyjs.com/2012/11/12/code-review-watch-js/)
- [observe-js](https://github.com/Polymer/observe-js)
- [validator.js](https://github.com/chriso/validator.js)、 [URI.js](https://github.com/medialize/URI.js/)

- [meteor](https://www.meteor.com/)、[介绍](http://www.infoq.com/cn/news/2013/06/meteor-real-time)
- [template-chooser](http://garann.github.io/template-chooser/)
- [bounce.js](https://github.com/tictail/bounce.js): Create beautiful CSS3 powered animations in no time.
- [codemirror](http://codemirror.net/)
    - CodeMirror 是一款“Online Source Editor”，实时在线代码高亮显示。
    - [介绍与示例](http://www.oschina.net/p/codemirror/)、[示例](http://codemirror.net/demo/preview.html)
- [nico-静态网站生成器](https://github.com/lepture/nico)
- [multi-touch gestures](https://github.com/hammerjs/hammer.js)
- [handsontable](https://github.com/handsontable/handsontable)：Handsontable is a minimalist Excel-like data grid editor for HTML & JavaScript
- charts
    - morris：图形较少、开源免费、可商用
    - highcharts：商用需购买
    - [amcharts](http://www.amcharts.com/demos/)

- [CSS与界面动效](http://www.imooc.com/video/6041)、[]()、[]()、[]()

- [Javascript reactive frameworks](http://rrees.me/2015/06/04/overview-of-javascript-reactive-frameworks/)

- [开源前端框架纵横谈](http://www.csdn.net/article/2013-04-15/2814893)
- [一个对前端模板技术的全面总结](http://www.html-js.com/article/2313)
- [Pros and Cons of Facebook's React vs. Web Components (Polymer)](http://programmers.stackexchange.com/questions/225400/pros-and-cons-of-facebooks-react-vs-web-components-polymer)
- [The State of the Componentised Web](http://www.futureinsights.com/home/the-state-of-the-componentised-web.html)
- [How can React and Flux help us create better Angular applications](https://medium.com/@gilbox/how-can-react-and-flux-help-us-create-better-stronger-faster-angular-applications-639247898fb)
- [Web Components - building blocks of the future web](https://www.infinum.co/the-capsized-eight/articles/web-components-building-blocks-of-the-future-web)

### 智能
[brain](https://github.com/harthur/brain)、[convnetjs](https://github.com/karpathy/convnetjs)、[synaptic](https://github.com/cazala/synaptic)


### react 与 angular 对比
Angular, Ember and Knockout put “JS” in your HTML. React puts “HTML” in your JS.
例如：ng: `<div style="margin: {{$$showAdvance?'0':'-43px'}} 0 15px 0;">`

- Data binding systems are not statically analyzable. (linting  Minification  Type checking)
- angular不能进行服务端渲染：Since server side rendering adds logic into your HTML and AngularJS writes logic in HTML, there is no clear separation of concerns and as a result you get spaghetti code.

- react比angular更简单
    - My number one reason for preferring React to AngularJS is its simplicity. This is very apparent when learning the frameworks. AngularJS introduces an explosion of new concepts. In React there are just three important concepts: components with properties and state. Components are just code. There is so little to React that when I started to learn it I could read all the documentation in just one day.
- 组件组合使用起来更简单，angular的directive组合使用比较麻烦
- 单向绑定比双向绑定更清晰
    - The reason is that data flow is much clearer when data flows in only one direction. You can trace a React program from start to finish.
- 比angular性能更好
- React components are far more powerful than Angular templates; they should be compared with Angular's directives instead.
- There's no linking function because React figures out how to most efficiently update the DOM for you when your data changes. Just write your render() function and React will keep the UI up-to-date for you.


## `mv*`
[什么时候需要mv框架](http://coding.smashingmagazine.com/2012/07/27/journey-through-the-javascript-mvc-jungle/)：
- 仅需要与后端api或服务通信的应用，在浏览器端需要繁重的view操作和数据操作。象 gmail 和 Google docs 经常需要切换阅读不同的邮件或文档，做成单页的便不需要频繁建立HTTP链接。
- 一些很复杂的应用，局部的view的渲染，可以嵌入单页mv*应用，会更高效
- 对于大多view在服务器端渲染的应用，只是需要一些js做些富交互性动作，就不需要这些框架了

### 选择 & 对比
- [todomvc](http://todomvc.com/)
- [The Top 10 Javascript MVC Frameworks Reviewed](http://codebrief.com/2012/01/the-top-10-javascript-mvc-frameworks-reviewed/)
- [AngularJS vs. Backbone.js vs. Ember.js](https://www.airpair.com/js/javascript-framework-comparison)
- [JavaScript MVC框架PK：Angular、Backbone、CanJS与Ember](http://www.ituring.com.cn/article/38394)
- [JavaScript宝座：七大框架论剑](http://news.cnblogs.com/n/153121/)
- [Is Angular.js or Ember.js the better choice for JavaScript frameworks?](http://www.quora.com/Is-Angular-js-or-Ember-js-the-better-choice-for-JavaScript-frameworks#)

### ui库
- 国内：[fineui](http://fineui.com/)、[amazeui](http://amazeui.org/)、[miniui](http://www.miniui.com/)
- [jQueryUI  VS  Kendo UI](http://jqueryuivskendoui.com/)
- [wijmo angular](http://wijmo.com/angularjs-components-preview/)、[webix](http://webix.com/)
- [semantic-ui](http://semantic-ui.com/)、 [Flat-UI](http://designmodo.github.io/Flat-UI/)
、 [html5-boilerplate](https://github.com/h5bp/html5-boilerplate)

### 列表：
- [aurelia](http://aurelia.io/)、[introducing-aurelia](http://blog.durandal.io/2015/01/26/introducing-aurelia/)
- [angular](http://angularjs.org/)
    - [angular-ui](http://angular-ui.github.io/)
    - [angular-strap](http://mgcrea.github.io/angular-strap/)
    - [ionicframework](http://ionicframework.com/) 基于angular的、适用于移动端的框架

- [backbone.js](http://backbonejs.org/) -- mvp
    - [书：backbone-fundamentals](http://addyosmani.github.io/backbone-fundamentals/)
    - [Backbone.js And JavaScript Garbage Collection](http://lostechies.com/derickbailey/2012/03/19/backbone-js-and-javascript-garbage-collection/)
    - [Ampersand.js](http://www.infoq.com/cn/news/2014/07/ampersandjs)
    - [Riot.js](http://www.csdn.net/article/2013-11-08/2817439-riotjs)

- [React](http://facebook.github.io/react/index.html)
    - [react-bootstrap](http://react-bootstrap.github.io/components.html)
    - [react-components](http://react-components.com/)
    - [react-starter-kit](https://github.com/kriasoft/react-starter-kit)
    - [mercury](https://github.com/Raynos/mercury)
    - [Mithril](http://lhorie.github.io/mithril/) 类似react、都有Virtual DOM

- [vuejs](http://vuejs.org/)
    - 内部使用`Object.defineProperty`实现
    - [What is the difference between Vue.js AngularJS、KnockoutJS and React.js ](http://vuejs.org/guide/faq.html)
    - [Thinking in Vue.js](http://www.atatech.org/articles/21300/?frm=mail_daily&uid=71228&rnd=1792170299)

- [Knockout.js](http://knockoutjs.com)
    - ko 提供更高层次的连接data model与ui的方式，与jQuery不冲突，可以同时使用，另外一些动画效果也需要用 jQuery 实现。
    - [MVVM模式介绍](http://knockoutjs.com/documentation/observables.html#mvvm_and_view_models)  对照 [ember计算属性](http://www.emberjs.cn/guides/object-model/computed-properties/)
    - 新版[引入“组件”](http://www.infoq.com/cn/news/2014/08/knockout-components)，更贴近web components

- [Ember.js](http://emberjs.com)
    - [Ember.js 的初学者指南](http://www.adobe.com/cn/devnet/html5/articles/flame-on-a-beginners-guide-to-emberjs.html)
    - [类与实例](http://www.emberjs.cn/guides/object-model/classes-and-instances/)：与 arale 对比
    - [模板](http://www.emberjs.cn/guides/templates/the-application-template/)  做法：注册 Handlebars 的helper，与ember js结合 提供语义化动态模板。模板定义及写法怪异。。
    - [组件](http://www.emberjs.cn/guides/components/)：能生成 自定义html元素标签，与 模板 写法结合、集合一部分html元素为一个组件，组件嵌套、通信有相应方法，但给人感觉比较繁琐。
    - [控制器](http://www.emberjs.cn/guides/controllers/)：有 Controller  ArrayController  ObjectController 三种类型
    - [模型](http://www.emberjs.cn/guides/models/)：在Ember中，每个路由都有与之相关联的一个模型。这个模型通过路由的model钩子进行设置，可以是通过{{link-to}}传入的一个参数，也可以是调用路由的transitionTo()方法。
    - [路由模块](http://www.emberjs.cn/guides/routing/)：看起来很完善、功能也挺强大
    - ember 的 组件、视图 等模块，充分利用了 Handlebars ，或许整个ember的思想目的就是强化 Handlebars的功能 ？

- [avalon.js](https://github.com/RubyLouvre/avalon)
    - [其他人介绍](http://www.cnblogs.com/vajoy/p/4063824.html)


### ExtJS：
面向对象。[新手入门](http://extjs.io/blog/2012/08/28/how-to-study-extjs/)

缺点：because it generates unnecessary codes and it is really hard for css to style.It does not play well with existing html and javascript code bases.

### [dojo](http://dojotoolkit.org/)：
面向对象、AMD。[Dojo与jQuery综合比较分析](http://blog.csdn.net/dojotoolkit/article/details/7682978)

dojo的新特性：模块化、事件和AOP、pub/sub  promise的变化、监控attributes的变化。

### [MooTools](http://mootools.net/)：
面向对象、模块化。 [jQuery与mootools对比](http://www.jqueryvsmootools.com/)：MooTools充分利用JS，而jQuery围绕着dom。


[tiny-binary-format](https://github.com/danprince/tiny-binary-format)
------
Memory efficient JS using binary formats instead of objects.
Just remember that once the data has been serialized, it will always be read back out as numbers.
源自一个游戏引擎，被应用与游戏上。数据一旦被序列化，只能再转回为“数值”类型，不能是字符串或对象类型。

These tiles can be stored in [TypedArrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) for further memory efficiency and performance benefits. The size can become as little as ~3% if you fit the format into two bytes, then store it in a [Uint16Array](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array).
数据被存储为TypedArrays后性能得到提升，被存为Uint16Array后、大小是原来的3%左右。


[Asm.js](http://developer.51cto.com/art/201401/428154_all.htm)
------
[简单介绍](http://www.iteye.com/news/27306)、[介绍](https://software.intel.com/zh-cn/articles/html5-asmjs)

目前一般的Asm.js应用都是从C/C++编译到Javascript的，很显然它们都不会与DOM进行任何交互，而是直接与WebGL打交道。

Asm.js只能处理被挑出的几种不同的数值类型，而没有提供其他的数据类型（包括字符串，布尔型和对象）。这么做以后，结果就是高度优化，并且可以直接从Asm.js语法转换成汇编，而不必像常常要对Javascript做的那样解释它。它有效地削减了使像Javascript之类的的动态语言缓慢的东西：例如需要垃圾收集器和动态类型。

现在几乎所有基于Asm.js的应用都是C/C++应用使用Emscripten编译的。可以肯定的说，在不久的将来，这类即将运行在 Asm.js的应用，将会从可以在浏览器中运行这一可移植性中获益，但是在支持javascript方面有一定复杂度的应用将不可行。

既然asm.js的确扩展了web的基础，潜在的用户群很广。其中一批用户就是那些想得到尽可能多的运算能力的游戏开发者。

现在Asm.js还不能进行与有关DOM和浏览器的操作。创建一个Emscripten到Ams.js版本的DOM（就像DOM.js）如何？创建DOM.js一个动机就是想要看一下纯JS实现的DOM能否击败传统、低效的出入队列式的、跨堆栈的JS堆与相关C++ DOM对象之间的内存管理方法。有了asm.js的支持，DOM.js也许可以在性能上胜过那些高度优化过的数据结构。



[simd-js](http://www.2ality.com/2013/12/simd-js.html)
------
[中文介绍](http://www.oschina.net/translate/introducing-simd-js)、[介绍](http://chinese.vr-zone.com/117601/javascript-boost-intel-google-mozilla-bring-simd-to-javascript-13062014/)

SIMD 是单指令多数据(Single Instruction Multiple Data)的缩写 , 意思是一次对多条数据进行操作. 比如, 一条 SIMD 加法指令能同时对多条数据进行加法运算. SIMD 这种能提高运算速度的技术, 在图形处理, 音频处理, 编码, 物理仿真, 加密等领域中得到广泛应用。

目前Intel 已经提出一些低阶API 可以在JavaScript 直接对SIMD 作Programming，可以透过JavaScript JIT compiler 直接编译，或是透过Mozilla Emscripten 编译器这类透过LLVM 将C++ 转译成JavaScript 的工具来产生SIMD 代码。SIMD.JS 也同样具有架构中立性，在ARM 或是x86 这样不同但都支援SIMD 的平台都能进行支援。
