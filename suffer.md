

## 2022~2023


### 2023-03


ts高级用法 Omit Pick
```ts
import { INameProps } from './Name';
type IDashboardNameProps = {
  className?: string;
  style: React.CSSProperties;
} & Pick<INameProps, 'id' | 'onSaved'>;
```

vscode 里某个 tsx 文件的 IntelliSense 报错 `which is not compatible with the one in 'tslib'`
- 参考 [VSCode to use locally installed TypeScript](https://stackoverflow.com/questions/54810894/how-to-force-vscode-to-use-locally-installed-typescript)。 使用 `.vscode/settings.json` 本地文件配置 `"typescript.tsdk": "node_modules/typescript/lib"` （打开 vscode 设置，搜索 `tsdk` 参考）。 点击 vscode 底部状态栏右下角 `TypeScript JSX` 前的图标，找到 TypeScript Version 选择 Select Version 切换使用本地的 tsx 编译器。

### 2022-04

arm aem 对任何请求（包括图片）都做埋点，导致业务接口被阻塞，页面性能下降一倍。采用合并、延迟上报埋点方式，把所有打点请求都延迟推入单独的队列维护，当页面完全加载完成后再从队列中依次取出数据进行上报。下掉非必要埋点。

### 2022-02

- 一个组件里 点击触发请求、返回成功或失败，设置 isSuccess 的布尔值。另一个组件 需要监听 成功和重新点击 的状态，即 重新点击 isSuccess 不能为 true，但上次点击后 已经把它设置为了 true 怎么解决？
- useEffect 里监听的 多个状态、互相有影响，怎么解决？分别写 useEffect。
- antd 多层弹窗嵌套需要设置 [getPopupContainer](https://img.alicdn.com/imgextra/i3/O1CN01uK3oLs1dJyW9Y1sZJ_!!6000000003716-0-tps-1234-1166.jpg)

### 2022-01
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

## 2020~2021

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


## 2019 Charles 抓包
- 使用没有 被设置代理的 浏览器（比如 Chrome **翻墙代理需要关掉**）
- HTTPs 支持：
   - Help -> SSL Proxying -> Install Charles Root Certificate (挨着的 **模拟器** / **手机 **证书都装)
      - 注意：**手机上安装的 证书 和 连接的 mac 电脑要匹配。使用新电脑需要重新给手机安装证书。**
   - 在 macOS 钥匙串访问 里信任证书，iOS 设置里信任证书。
   - 在 Charles 里菜单 Proxy -> “Proxy Setting” Port: 8888 / “SSL Proxying Settings - SSL Proxying - add” 内容 Host:* 、Port:443
   - 在 iOS (**不用连数据线**) WiFi 设置 HTTP 代理，服务器输入 电脑 ip、端口 8888
- 其他：
   - 关闭 mac 端包的抓取：菜单 Proxy 将 maxOS Proxy 取消选中 （这样 iOS 模拟器里也抓不了）
   - 抓取支付宝 RPC 请求：支付宝 可切换环境包 设置关闭 mmtp 开关
   - 映射本地 js 文件、调试代码：菜单 Tools -> Map Remote / Map Local…
   - 为请求配置跨域 CORS：菜单 Tools -> Rewrite...


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
