# chrome 扩展

安装：Chrome输入`chrome://extensions`打开扩展页面，把`ce_blank`目录拖拽进去，即可安装。
查看安装位置：勾选扩展页面右上角的 `开发者模式`，扩展会显示各自的`extension ID`。

调试方法

1. 打开 `chrome://extensions/` 相应的插件名、点“刷新”按钮，点击 `chrome://newtab` 页面的 后退 按钮。
2. manifest -> background -> scripts 打开 `chrome://extensions/` 相应的插件名、点“背景页”。
3. manifest -> content_scripts 设置的 js 位置：“控制台 -> Sources -> Content scripts”

获取 Chrome 本地存储 `await chrome.storage.sync.get(null)`


## 记录

在 background.js 用 `chrome.runtime.sendMessage` 发消息、所有页面里的 content_scripts 都收不到，改为 `chrome.tabs.sendMessage` 发送、比如 `https://www.xxx` 外部正常域名的页面“可以收到”、但位于插件内部的页面比如 `chrome-extension://extension-id/xx.html` 收不到。
位于插件内部的页面的 js 文件里，可以直接调用 `chrome.action/storage/commands/..` 等 chrome api，如果插件内部的页面处于打开运行状态、其上注册的 chrome 扩展功能 就能运行，如果关掉页面、扩展功能将不能运行。


开发时生成固定的 [extension_id](https://stackoverflow.com/questions/21497781)、
[crxviewer](https://robwu.nl/crxviewer/)，在不同电脑上安装、打开`chrome://sync-internals/`搜 `hl_` 验证结果。
注意 `chrome.storage.sync` 只存储和同步当前插件的数据，如果卸载插件、则同步的数据立即被删除。


`chrome://newtab` 页面、其他标签页打开的 xxx.com 页面，与其内嵌的 iframe 通信限制方面完全一样、不能跨域访问。包括他们被注入的 content_scripts 在访问跨域iframe时、也一样受到限制。


rules.json 里的 modifyHeaders 修改 responseHeaders 会生效，但是不显示在 Chrome DevTools 里。ref [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=258064)


### 2024-06 Native messaging

先 `chmod a+x nm_sh/nm_python` 再放到 `~/Applications` 目录里。
json 配置文件放到 `~/Library/Application Support/Google/Chrome/NativeMessagingHosts` 里。

Google 搜索 chrome extension native message nodejs
https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging?hl=zh-cn
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging
https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/nativeMessaging

https://stackoverflow.com/questions/22222624/how-can-we-execute-a-shell-command-from-a-chrome-extension-is-there-a-provided


### 2022-09-17

梳理清楚各个 js 执行的先后顺序。注意 chrome.webRequest 和 chrome.webNavigation 生命周期顺序。


`chrome://newtab` 页面 以 iframe 方式嵌入 xxx.com 页面、并且 注入 content_script 如果在 content_script 里访问 `chrome://newtab` 页面的 `window.xx` (即 `top.xxx`) 则会报错: Uncaught SecurityError: Blocked a frame with origin "https://xxx.com" from accessing a frame with origin "chrome-extension://pbcjojjclbiihmponegploiehianebdk". The frame requesting access has a protocol of "https". 同样 `chrome://newtab` 页面、因为跨域 也不能访问 iframe 里的 xxx.com 页面 window 对象。


override [newtab](https://developer.chrome.com/docs/extensions/mv3/override/) 后的页面是 chrome-extension://pbcjojjclbiihmponegploiehianebdk/blank.html 不能在此页面运行 `chrome.scripting.executeScript` why? https://bugs.chromium.org/p/chromium/issues/detail?id=1191971


chrome.webRequest 和 chrome.webNavigation 都不能获取到 HTTP [Response Body](https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body)


### 2022-09-08

[Overview of Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)

manifest v3 的 csp 策略更加严格，不允许远程 cdn 资源加载。如下 v2 设置

```json
"content_security_policy": "script-src 'self' 'unsafe-eval' https://code.jquery.com https://gw.alipayobjects.com; object-src 'self'",
```

需要去掉 jquery 和 alipayobjects 远程地址。
[mdn csp](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
[edge csp](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/store-policies/csp)

v3 中的 webRequest api 被废弃，改为使用 declarativeNetRequest 来处理请求。声明式 API 使用略微不便。


### 2021-2020 manifest.json v2

```json
{
  "name": "Block",
  "description": "把特定网络 js 文件指向到本地",
  "version": "0.2",
  "manifest_version": 2,
  "permissions": [
    "webRequest",
    "webRequestBlocking",
    "https://img.alicdn.com/tps/*"
  ],
  "browser_action": {},
  "background": {
    "scripts": ["bg.js"],
    "persistent": true
  },
  "content_scripts": [
    {
      "matches": ["*://*/*", "https://www.alipay.com/*", "<all_urls>"],
      "js": ["inj.js"],
      "css": ["content.css"],
      "all_frames": true,
      "match_about_blank": true,
      "match_origin_as_fallback": true,
      "run_at": "document_end"
    }
  ]
}
```



## 代码示例


```js

// 2022-10
// https://bytedance.feishu.cn/drive/me/ 页面的部分请求 403 错误，导致在 iframe 里显示不正常。
// 因为飞书代码里 window.parent 判断如果是在 iframe 里，会让 request headers 里的 x-csrftoken 设置失败。
const cookieStores = await chrome.cookies.get({ name: '_csrf_token', url: driveMeUrl });
console.log('cookieStores', cookieStores.value);
const res = await chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [10],
  addRules: [
    {
      "id": 10,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": [
          { "header": "x-csrftoken", "operation": "set", "value": cookieStores?.value || '' }
        ]
      },
      "condition": { "urlFilter": 'space/api', "resourceTypes": ["xmlhttprequest"] }
    }
  ]
});
console.log('dnres', res);


chrome.topSites.get(data => {
  console.log('topSites', data);
});

chrome.tabs.onActivated.addListener(moveToFirstPosition);
async function moveToFirstPosition(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, {index: 0});
    console.log('Success.');
  } catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}

// 2022-09-17 只返回 extensions 不会返回 app
chrome.management.getAll(data => {
  console.log('management', data.map(item => item.type));
});

```


```js

// https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#sunset-deprecated-apis

// webRequest 生命周期监听

chrome.webRequest.onBeforeRequest.addListener(function (details) {
  console.log('onBeforeRequest', details)
  return { cancel: false };
}, {urls: ["<all_urls>"]});

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  console.log('onBeforeSendHeaders', details);
  // v3 不能再修改 header 因为不能设置 blocking
  // 设置 iPhone UA
  // if (headers[i].name == 'User-Agent') {
  //   headers[i].value = 'iPhone ua';
  // }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders']);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  // remove the X-Frame-Options header to allow inlining pages within an iframe.
  // var header = headers[i].name.toLowerCase();
  // if (header == 'x-frame-options' || 'frame-options' || 'content-security-policy') {
  //   headers.splice(i, 1); // Remove header
  // }
  console.log('onHeadersReceived', details)
  return {responseHeaders: headers};
},
{ urls: ['*://*/*'], types: ['sub_frame'] }, ['responseHeaders']);

chrome.webRequest.onCompleted.addListener(details => {
  console.log('ttt', details);
}, {urls: ["<all_urls>"]})

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
  // 去广告
  console.log('onDOMContentLoaded', details)
}, { url: [{ hostContains: 'google.com' }] });

chrome.webNavigation.onCompleted.addListener(details => {
  // console.log('ttt', details);
});

chrome.tabs.captureVisibleTab(function (params) {
  // 截图
  // console.log(params)
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('onUpdated', tabId, changeInfo, tab);
});
// chrome.tabs.create({ "url": "http://google.com" });


chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('onchange Value currently is ', changes, namespace);
});
chrome.runtime.onMessage.addListener(function(e, t, s) {
  console.log('onMessage Value currently is ', e, t, s);
});


// programmatically injected content_scripts
// 注意：先注册到相应域 后让页面加载 才会执行先注册的 js
const rcs = await chrome.scripting.getRegisteredContentScripts();
const id = '1';
if (!rcs.find(item => item.id === id)) {
  await chrome.scripting.registerContentScripts([{
    id,
    allFrames: true,
    // content_scripts 虽然设置了 match_about_blank 和 match_origin_as_fallback
    // 但不能在 data:text/html,<html>Hello, World!</html> 这里起作用
    matchOriginAsFallback: true,
    // matches: ["<all_urls>"],
    // matches: ['http://localhost/*'],
    runAt: 'document_start',
    // world: 'MAIN', // 默认是 ISOLATED 改变设置会影响 chrome.runtime.sendMessage
    js: ['constants.js', 'content_script.js'],
  }]);
  // console.log('register success');
}

// 在 manifest 的 content_scripts 里设置 "world": "MAIN", 不起作用。
// content_scripts 是独立环境执行，在注入的 content_script.js 里修改页面本来的 window 对象无效
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
// https://stackoverflow.com/questions/9515704
// https://stackoverflow.com/questions/12395722
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// window 对象的 parent top 属性都是 只读 的。如 window.top = window; 修改无效
// Object.defineProperty(window, 'top', {
//   get () {
//     return 100;
//   }
// });

// 插件内的 html 文件里不能注入 content_scripts

```
