// ignore_security_alert_file SSRF
// https://developer.chrome.com/docs/extensions/mv3/service_workers/
console.log('bg page, 注意其执行时机', chrome);
// console.log('bg page init no window', window?.document?.title);

// 点击扩展图标 触发以下事件
chrome.action.onClicked.addListener(async (tab) => {
  // 在当前 tab 右边打开新 tab
  // const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  // chrome.tabs.create({ index: curTab.index + 1 });
  // console.log('aaat', tab, curTab);
});

chrome.runtime.onStartup.addListener(() => {
  console.log('when exec onStartup');
});
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
    console.log("This is a first install!");
  } else if(details.reason == "update"){
    var thisVersion = chrome.runtime.getManifest().version;
    console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
  }
  // servicework 里打开 option.html https://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update
  chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
});

function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// 参考 https://blog.shahednasser.com/register-a-keyword-in-chrome-omnibox-in-your-extension/
// omnibox 相关操作  https://developer.chrome.com/docs/extensions/reference/omnibox/
// 翻译 https://blog.csdn.net/u012419303/article/details/106263338
chrome.omnibox.setDefaultSuggestion({
  description: '输入中文翻译为英语'
});
// 在地址栏调用 Google 翻译 API 直接搜索
const changeDelay = debounce((text, suggest) => {
  if (text.length <= 1) {
    suggest([]);
    return;
  }
  // console.log('debounce', text, suggest);
  fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=zh-CN&tl=en&q=' + text)
    .then((response) => response.json())
    .then((data) => {
      // console.log('ddd', data);
      const resAry = data?.[0]?.[0];
      if (resAry?.length) {
        suggest([{
          content: `${resAry?.[1]} | ${resAry?.[0]}`,
          deletable: true,
          description: `<dim>中文 ${resAry?.[1]} 英文</dim> <match>${resAry?.[0]}</match> <url>chrome://newtab</url>`
        }]);
      }
    });
}, 900);
// 填入搜索结果到本插件 Google 翻译的 iframe 里，产生搜索记录、方便回顾
const saveResult = async (text) => {
  // console.log('enter', text);
  const cn = text?.split(' | ')?.[0];
  if (!cn) {
    return;
  }
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  // console.log('enter', curTab.url, location.href);
  const newTranslateUrl = `https://translate.google.com/?sl=zh-CN&tl=en&text=${cn}&op=translate`;
  if (curTab.url === 'chrome://newtab/') {
    chrome.tabs.sendMessage(curTab.id, {
      _bg: true,
      _url: 'https://translate.google',
      newTranslateUrl,
    });
  } else {
    chrome.tabs.create({ url: newTranslateUrl, index: curTab.index });
  }
};

let cacheText = '';
chrome.omnibox.onInputCancelled.addListener(() => {
  // console.log('onInputCancelled', cacheText);
  if (cacheText.trim().length) {
    void saveResult(cacheText);
  }
});
// chrome.omnibox.onInputChanged.addListener(changeDelay);
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // console.log('change', text);
  cacheText = text;
  return changeDelay(text, suggest);
});
chrome.omnibox.onInputEntered.addListener(saveResult);
chrome.omnibox.onDeleteSuggestion.addListener((text) => {
  // how to fire
  // console.log('onDeleteSuggestion', text, cacheText);
});
chrome.omnibox.onInputStarted.addListener((text) => {
  // how to fire
  // console.log('onInputStarted', text, cacheText);
  chrome.runtime.sendMessage({
    _bg: true,
    openModal: 1,
  });
});

// mac chrome address bar search shortcuts CMD+Enter open new background tab
// 在 地址栏搜索 并按住 CMD+Enter 后打开的 tab 移动到在当前 tab 右边
chrome.tabs.onCreated.addListener(async (tabInfo) => {
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  console.log('onCreated', tabInfo, curTab);
  if (!tabInfo.active && tabInfo.pendingUrl?.indexOf('https://www.google.') === 0) {
    await chrome.tabs.move(tabInfo.id, { index: curTab.index + 1 });
  }
});
