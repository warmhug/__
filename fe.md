# fe suffer


## 2024-07 组件 pro-components


[father 2.x](https://github.com/umijs/father/tree/v2.9.0) 基于 [rollupjs](https://rollupjs.org/) 构建，采用 babel插件 编译 js/ts、采用 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 编译 less/css (不支持less配置项)。利用 [docz](https://www.docz.site/) 生成网站。

- [postcss](https://github.com/postcss/postcss): 处在 css 预处理器 less scss 等流程之后，解析 css 为 ast，并有 Autoprefixer 等知名插件。

[rollup，vite以及webpack比较与介绍](https://juejin.cn/post/7097493230572273700)
- rollup 与 webpack 都是基于JavaScript依赖系统的一个打包构建工具，他们的共同点很多。 Rollup 默认打包为 ES6 格式、依靠插件生成 CommonJS 和 AMD 代码，静态分析代码中的 import 并排除任何未实际使用的代码。 Rollup 构建速度明显快于 webpack，生成的代码量很小。
- 不过在应用开发层面讲，如果开发一个Web应用webpack要比rollup有更大的优势，因为其天然继承了devServer以及hmr，这使得开发者可以快速的对应用进行调试开发。 Rollup 更加适合插件开发，而webpack更加适合应用开发。
- vite 号称是下一代的打包构建工具，主要体现在他从开发环境到生产环境的构建速度都能比webpack提升很多倍，原因就在于基于 rollup 和 esbuild 两个基础构建工具上。利用浏览器对ESM模块的支持，通过babel解决兼容性。将应用中的模块区分为 依赖 和 源码 两类，Vite使用esbuild预构建依赖、构建速度快 10-100 倍。在浏览器请求源码时、根据 router 按需以 原生 ESM方式提供 源码。利用 HTTP 头来加速整个页面的重新加载，源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。
- esbuild 使用 go 编写，发挥多线程多核优势，不使用 AST。所以一些通过 AST 处理代码的 babel插件没有很好的方法过渡到 esbuild 中。


## 2024-06 pintu

体验问题: avi 对图的大小限制、下载大图时进度提示、重复点击和并发问题、下载低质量(宽高和分辨率不变)图片。

设计稿 设计倍率:
[摹客](https://help.mockplus.cn/p/504) 插件，可以自动匹配特定的尺寸为 2x 倍率、其他尺寸为 1x 倍率，可以手动修改指定。[摹客demo](https://app.mockplus.cn/app/z1pw7JNhn/develop/design/mmHsUz9q0)
蓝湖 待调研。

相关:
- [蓝湖](https://lanhuapp.com/)、[摹客](https://www.mockplus.cn/)、[moonvy](https://moonvy.com/)
- [缩小png](https://tinypng.com/) [changeDPI](https://github.com/shutterstock/changeDPI)

### sketch 插件

https://developer.sketch.com/plugins
[Sketch 插件开发实践](https://segmentfault.com/a/1190000020920371)

Sketch 和 Figma 插件都不支持 XMLHttpRequest 导致上传图片时 无法监听上传进度
fetch 只能监听下载进度 https://juejin.cn/post/7253969759191023675
https://forum.figma.com/t/cannot-make-a-post-request-in-figma-plugin/25039

[skpm](https://github.com/skpm/skpm) 通过 polyfill 方式支持 fetch FormData 如下代码
https://github.com/skpm/skpm/blob/master/packages/builder/src/utils/webpackConfig.js
```js
new webpack.ProvidePlugin({
   fetch: require.resolve('sketch-polyfill-fetch'),
   FormData: require.resolve('sketch-polyfill-fetch/lib/form-data'),
   Promise: require.resolve('@skpm/promise'),
}),
```

浏览器/node等环境的 宿主 判断如下，但 sketch 插件的宿主跟这些都不同
```js
// https://github.com/ladjs/superagent/blob/master/src/client.js
let root;
if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = this;
} else {
  // Web Worker
  root = self;
}
```


## 2024-06 pintu WebGL 图像查看器

能支持超大图 不卡顿。 https://www.photopea.com/ (Facebook [私信](https://www.facebook.com/photopea))

- [sketch demo](https://www.sketch.com/s/a00a5b36-d81a-4a55-8e78-ffac2894d292)
- [figma demo](https://www.figma.com/design/dknmxVeJpnOq5aD0K9WvUa/test?node-id=0-1&t=qfDYyfOJPjQe4SDo-0)

figma 不支持插入 大于 4096px 的图片，会被裁剪和降低清晰度，参考[文档](https://help.figma.com/hc/en-us/articles/360040028034-Add-images-and-videos-to-design-files)。

canvas 模糊问题：
[antialiasing](https://stackoverflow.com/questions/17861447/html5-canvas-drawimage-how-to-apply-antialiasing)
[canvas-blur](https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da)
[lines-are-blurry](https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry)
[canvas drawimage blurry](https://stackoverflow.com/questions/31910043/html5-canvas-drawimage-draws-image-blurry)
[higher-dpi-graphics-with-html5-canvas](https://stackoverflow.com/questions/14488849/higher-dpi-graphics-with-html5-canvas)
[sketch points-vs-pixels](https://www.sketch.com/support/sketch-features/mac-app/points-vs-pixels/)
[Optimizing_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

查看支持度: chrome://gpu  chrome://settings/system (图形加速)  https://get.webgl.org/
注意：
- 如果电脑只有一个显卡，比如 mac mini（m系列芯片）、Windows台式机、部分低配笔记本电脑，需要在 Chrome 浏览器设置里开启“图形加速”功能。
- Chrome 图形加速开启方法：手动打开“设置-系统”、或在浏览器地址栏输入`chrome://settings/system`，勾选“使用图形加速功能”，重启浏览器。
- Intel 电脑一般都有双显卡。
- 外接显示器没有GPU。因此，图形渲染由主 CPU 完成。
- 开启图形加速，可能使 Chrome cpu 占用一直高于 100%、风扇噪音大。

参考
- https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html
- https://webglfundamentals.org/webgl/lessons/webgl-2d-scale.html
- https://webgl2fundamentals.org/webgl/lessons/webgl-cross-platform-issues.html
- https://elhigu.github.io/canvas-image-tiles/
- https://fengyuanchen.github.io/cropperjs/
- https://pettor.github.io/app-pixi-image-editor
- https://github.com/pixijs/pixijs/issues/6372
- https://css-tricks.com/building-an-images-gallery-using-pixijs-and-webgl/
- https://github.com/openseadragon/openseadragon

- canvas engines 性能测试 https://benchmarks.slaylines.io/webgl.html
- WebGL vs WebGPU https://www.infoq.cn/article/QwAwharqAwdrAgtCoXQv
- 360 viewer https://github.com/y-fujii/zuho
- 360 viewer https://github.com/Experience-Monks/360-image-viewer
- 医学图像查看 https://github.com/niivue/niivue
- https://www.wenjiangs.com/docs/webgl-docs-zh
- https://stackoverflow.com/questions/21603350/is-there-any-reason-for-using-webgl-instead-of-2d-canvas-for-2d-games-apps

不是 webgl 实现的 https://github.com/konvajs/konva


## 2023

代码写的要优美(卷)：分块用class类、赋值用lodash set。

代码坑：代码目录结构层级深。公共组件或公共状态复杂且难找。未用到的代码没删除，后期涉及到改动也不敢轻易删。

代码以前正常、现在不正常，如果前端没有改动，那就是后端数据变更导致。比如 布尔 判断这种情况、前端这么写：
`obj.id ? update() : create()`; 后端的 id 数据变更后存在 number 0 时，前端代码逻辑即出错。这就是 js 的弱类型导致的问题。

tailwindcss 的 text-danger 等 className 使用。


## 2022-01~04

arm aem 对任何请求（包括图片）都做埋点，导致业务接口被阻塞，页面性能下降一倍。采用合并、延迟上报埋点方式，把所有打点请求都延迟推入单独的队列维护，当页面完全加载完成后再从队列中依次取出数据进行上报。下掉非必要埋点。

- 一个组件里 点击触发请求、返回成功或失败，设置 isSuccess 的布尔值。另一个组件 需要监听 成功和重新点击 的状态，即 重新点击 isSuccess 不能为 true，但上次点击后 已经把它设置为了 true 怎么解决？
- useEffect 里监听的 多个状态、互相有影响，怎么解决？分别写 useEffect。
- antd 多层弹窗嵌套需要设置 [getPopupContainer](https://img.alicdn.com/imgextra/i3/O1CN01uK3oLs1dJyW9Y1sZJ_!!6000000003716-0-tps-1234-1166.jpg)

react-big-calendar 日历组件支持自定义的 EventWrapper 子组件，业务场景中 EventWrapper 组件需要根据某个业务 prop 调用接口获取数据。但 EventWrapper 可能会被 react-big-calendar 加载卸载或重复渲染很多次(次数不可控)，而只用在“第一次加载或卸载再加载”时调用接口一次即可。此时 useEffect 的监听 该怎么写？

```js
// EventWrapper 组件
const { param1, param2, mode } = props;
useEffect(() => {
  if (mode === 'a') {
    fetchData({ param1, param2 })
  }
  // 怎么确保只请求一次，同时监听 prop 变化？
}, []);
```


## 2021-08 使用 remaxjs 开发小程序
- 导入函数不能这样 import _ from 'lodash'; 而要这样 import groupBy from 'lodash/groupBy'; (踩坑0.5h+)，遇到这类错误无法定位、调试困难。
- 样式：单位要 x2、box-sizing 要设置到相应位置，伪元素无法定位。
- 元素：span 标签有嵌套时不起作用、样式不正确，i 标签等更多 html 标签不支持。
- 组件：
   - 功能不强：Picker 不支持两列，Tabs 功能和样式不好用，类似pc上 tooltip 的 Tips 组件位置难设置，有些组件 slot 必须要用 View 不灵活。
   - 封装不完善，FlexItem 不支持设置 className、没有 Row Col 等便捷组件。
- 图表组件 g2 不起作用，antd、react-dom 等引用内容要移除。
- 迁移额外成本：很多地方都要修改，架构调整(找到pc各模块代码、删减/重新组织)。
- 小程序：picker 和 optionsSelect 的使用场景区别？mobile table design patterns 用列表代替表格。


## 2021 navigator.geolocation

> gts周日报需求，需要定位功能。

定位技术：GPS定位技术、基站定位技术、利用Wifi在小范围内定位。
GPS定位搜索卫星初次定位时间过长而略显不便。另外，卫星信号覆盖不好时，比如室内，会导致无法定位。
手机定位的原理 https://www.sohu.com/a/76257016_335896

问题：
2021-09 Chrome 浏览器在 4G 热点和家里 WiFi 环境下，不会执行 getCurrentPosition 公司 WiFi 可以。网络翻墙问题。
如图 https://gw.alicdn.com/imgextra/i4/O1CN01c6wdMl1OuPlbjec3c_!!6000000001765-2-tps-1112-518.png
最优方案、使用 高德或百度 封装的定位功能，避开 googleapis 被墙的问题。

2012-01 三星gt-i9003(安卓2.3.5)、中兴ZTE-U880(安卓2.2.2) 浏览器不执行 getCurrentPosition 也没有是否允许定位的提示框弹出。

```js
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition((position) => {
   console.log('geolocation', position);
},
(error) => {
   console.log('geolocation error', error);
   if (error.PERMISSION_DENIED) {
      console.log('未开启定位权限');
   }
   if (error.POSITION_UNAVAILABLE) {
      // 在 Chrome 浏览器里，因为被墙、会返回 Network location provider at 'https://www.googleapis.com/ :ERR_TIMED_OUT.
      console.log('至少有一个内部位置源返回一个内部错误');
   }
   if (error.TIMEOUT) {
      console.log('超时');
   }
},
{
   timeout: 1000 * 15,
   // enableHighAccuracy: true, // 设为 true 移动端通过 gps 定位、费电
   // maximumAge: 1000 * 15, // 返回 15 秒内的 缓存位置，默认为 0
}
);
} else {
/* geolocation IS NOT available */
}
```


## 2020~2021

- waterfall 瀑布流 内容顺序 难保证 https://segmentfault.com/q/1010000009117246/
- flex 顺序正确的 布局 https://jessieji.com/2019/pure-css-masonry
- 多列 https://segmentfault.com/a/1190000017866549

框架的“双向绑定”意思是 view -> state -> view 变化的绑定，而不是 state1 <-> state2 变化的绑定、同样功能的 state 只用定义一个、有多个就会导致 state 变更检测的死循环。

dashboard 数据边界细节很多。

周日报遗留问题：
复制文字+多个图片、分别上传多个图片。
保存过期、前端存。大表格崩溃、大小极限。 编辑页 id 输错、结果处理。
一次性复制进去、还是会弹出事项选择框。导入上一篇 事项匹配错误。
断网再连上、报标题不能为空。新版日志编辑器：选中报错、任务样式问题。

- beforeunload 事件里有 ajax 等不到返回、页面就会关闭，怎么解决？
- 使用 `DOMParser().parseFromString(xml, 'text/xml');`解析 xml 时、需要把 xml 里的 `&` 等特殊符号 转义为 `&amp;` 不然会解析错误；参考 解答[一](https://stackoverflow.com/questions/17423495/how-to-solve-ampersand-conversion-issue-in-xml)、[二](https://stackoverflow.com/questions/11555890/how-to-parse-xml-with-special-character-specifically-for-ampersand)。
- 使用 `https://localhost` 或 umi 报 Disconnected from the devServer, trying to reconnect... 提示、设置 `chrome://flags/#allow-insecure-localhost` 能暂时解决。
- Chrome 无法访问非受信证书页面，方法1: 在页面上手工输入 `thisisunsafe` 。方法2: 打开 `chrome://net-internals/#hsts`在 Delete domain security policies 里删除相应域名。
- blocked:mixed-content 在 HTTPS 页面上有 HTTP 的请求，会被 Chrome 阻止、统一改为 HTTPS 即可。参考 [fixing-mixed-content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content?hl=zh-cn)
- 绑定 host 访问 https 时 (`https://localhost`)、Chrome 可能会有 ERR_CERT_AUTHORITY_INVALID 证书错误，解决 [方法一](https://segmentfault.com/a/1190000021843971)、[方法二](https://blog.csdn.net/xujing19920814/article/details/53966948)。

- react 不会触发 keydown 事件，需要设置 focus 或 tabIndex="1"
- web excel 缺点：数据量大时页面死掉。
- 下载文件不能直接可点击下载，需要设置 csrf token 来避免安全问题。
- [大规格文件的上传优化](https://aotu.io/notes/2020/05/12/file-upload/index.html)

#### antd
- Table 伸缩列 [bug多](https://github.com/ant-design/ant-design/commit/84c65582c71c66df9744177d337cfd3d4ce1a713)、性能[差](https://github.com/ant-design/ant-design/issues/28214)。
- Menu 和 Modal `<Menu.Item onClick={doSth} />` 里放子组件、子组件里有 `<Modal onCancel={cancel} />` 弹窗，cancel 事件会触发 menu item 的 click 事件；弹窗里嵌套弹窗问题。
- Select 组件
   - 下拉框和选择框样式分别自定义场景：比如 `mode="multiple"`、`labelInValue`、`options` 的 label 为定制的 jsx 时，可使用 `Select.Option` 组件 + `optionLabelProp="label"` 组合来避免 `onChange` 参数里的 label 是 jsx 、也能让选择框里 选项样式 能自定义。
   - 无尽列表翻页 [issues/12406](https://github.com/ant-design/ant-design/issues/12406)
   - 搜索框和单选选择框合并 [0.12 效果](https://012x.ant.design/components/select/#demo-search)、[1.x修改](https://github.com/ant-design/ant-design/issues/1390)、1.0 [changelog](https://github.com/ant-design/ant-design/issues/1050)
   - 数据项有重复时 会乱跳，如视频：[mp4](https://gw.alipayobjects.com/os/rmsportal/GxGqYTHnIXRioQTbtkok.mp4)
- Upload 组件
   - 多文件合并到一个 xhr 里上传 [issues/8579](https://github.com/ant-design/ant-design/issues/8579)
   - 使用内部的 UploadList 来[自定义进度条显示位置](https://github.com/ant-design/ant-design/issues/8387)
   - umi-request 基于 fetch 实现、不支持显示上传文件的进度，而 axios 可以支持。
   - 使用`beforeUpload`来限制上传文件大小、`customRequest`自定义上传接口和上传进度。
- Upload 上传文件/夹 (参考 语雀 或 teambition 上传资源)
   - 上传的文件或文件夹、都会存在一个`fileList`列表里，文件属性`webkitRelativePath`的值存在时、表示上传的是文件夹里的文件。`onChange`会在上传状态(上传中、已完成、失败等)变化时调用。
   - 多次点上传按钮时、可根据`fileList`里每个条目的`uid`标记来区分新旧。两次上传同一个文件夹时、需要 分别创建不同的文件夹名，比如后缀加上(1)。
   - 需要等待 所有文件都上传后 (即状态都是 done) 并且至少有一个文件上传成功，再创建目录。
   - 前端根据每个文件的`webkitRelativePath`值，循环构造出多层 文件夹 的层级数据，传给后端。
   - 后端一般需要起“异步”的任务、创建各级文件夹，前端轮询异步任务状态、判断是否成功。
   - 大文件分片上传和断点续传[原理](https://segmentfault.com/a/1190000040309502)，需要使用 oss 提供的 sdk。
   - 文件夹里包含超过 300 个小文件，上传起始会卡顿、上传失败的文件优先显示、上传过程并发数的浏览器限制。
- Popover 和 Tooltip 组件，children 如果不是元素、而是 {props.children} 不起作用。

#### redux / dva / umi
- umi 某个 router 多处复用方案 [umi/1830](https://github.com/umijs/umi/issues/1830)、[umi/4569](https://github.com/umijs/umi/issues/4569)
- subscriptions 怎么获取到 model 中的 state [issues/1600](https://github.com/dvajs/dva/issues/1600)
- 多个请求并行发起 [redux-saga/issues/1800](https://github.com/redux-saga/redux-saga/issues/1800)、[redux-saga/pull/759](https://github.com/redux-saga/redux-saga/pull/759)、[dva/issues/1009](https://github.com/dvajs/dva/issues/1009)
- 如何请求多个数据源并渲染？如[图](https://img.alicdn.com/imgextra/i4/O1CN0150J8CS26jHFosJFF4_!!6000000007697-2-tps-476-266.png)


## 2019-02 大安全移动业务开发
- 熄屏时 JS 倒计时变慢 
- H5软键盘兼容方案 [https://segmentfault.com/a/1190000018959389](https://segmentfault.com/a/1190000018959389)
- iOS 9.1 以下系统的 WKWebView 在 302 后的 document 地址可能不变更。
   - 比如当前域 (mobileic.alipay.com) 有相对地址的 post 请求 `ajax({ url: './verify.json', method: 'post' })`，但是这个页面是由 上个域 (securitycore.alipay.com) 的页面 302 跳转过来的，最终拼接出来的 ajax url 地址是上个域的 `securitycore.alipay.com/verify.json`导致错误，所以 post url 建议换成绝对地址。
- antd-mobile Carousel 在 iPhone 7/8 上有些情况下，卡住不会滚动、斜着滑动(同时导致页面上下滑动)时卡顿。[ant-design-mobile/issues?utf8=%E2%9C%93&q=is%3Aissue+carousel](https://github.com/ant-design/ant-design-mobile/issues?utf8=%E2%9C%93&q=is%3Aissue+carousel)
- Input 输入框 被键盘遮挡
   - 更多 [讨论和解法](https://juejin.im/post/59d74afe5188257e8267b03f)，部分 安卓机型 比如 moto 暂时无法解决。
- Android 4 白屏: `Set``Promise``Symbol` 未定义错误
- iOS webview 里 https 页面引入 http 的 js/css 不能加载？需要统一使用 https 协议。
- iOS 9 不支持 箭头函数


## 2018-2019 G2/G6 问题

- [G2] 时间横坐标在 mac 能显示 24 小时、正常，在 win7 上只能显示 12 小时。
- [G6] 绘制每个元素，都要自己设置 大小、填充、边框？挨个绘制多个元素时：要获取前一个元素的位置 + 当前元素尺寸，手工重新定位？
- [G6] API 文档没法搜索：支持哪些属性设置、文档难查找。比如 label 的 text 居中怎么设置？
- [G6] fixView: autoZoom 和 maxZoom: 2 会有兼容性问题
   - mac chrome 71 图不会自动居中，出现在左上角。
   - win7 chrome 55 看起来正常，但此浏览器版本太旧。
- [G6] 图表疑似绘制两次？


## 2013-08 兼容性问题
- IE8及以下，ajax请求地址和参数相同时，会在一段事件内，读取浏览器缓存的ajax返回文件数据，而不去重新请求。-- 解决：请求参数加时间戳
- JSON.stringify 只支持IE8\9\10标准文档模式，考虑到文档设置有兼容性视图模式（IE67模式）需要对此方法做兼容（参考json2.js）
- input、textarea的blur事件中删改页面元素，会影响作用区域周围的元素事件处理。例如：点提交btn，先触发了blur事件，改变btn周围的元素，使得btn位置变动，此时btn的事件处理函数不会触发，再点才可触发。
- IE8里在某个元素上设置`background: transparent;`，给此元素添加事件，并不会触发事件，像click mousedown事件
- IE9什么原因能导致input file框点击没反应？
