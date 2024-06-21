// 2022-01-16 from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/bookmarks/basic/popup.js

// console.log('cb', chrome.bookmarks);

const folderIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzQyODVGNCI+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=';

function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return document.createElement('span');
      }
    }
    // html 0宽字符: U+200B  U+200C  U+200D   U+FEFF  &zwnj;&ZeroWidthSpace;&#xFEFF
    // 使用 正则替换、jQuery 的 html() 方法处理 都没效果。
    let formatTitle = bookmarkNode.title
      // .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // console.log('unicode', formatTitle, formatTitle.length, formatTitle.charAt(0));
    // formatTitle = $('<div />').html(formatTitle).html().replace(/\u200C/g, '');
    // formatTitle.split('').forEach(console.log);
    formatTitle = [...formatTitle].map((item, idx) => {
      // console.log(formatTitle.charCodeAt(idx))
      const unicodeZeroSpaces = [8203, 8204, 8205, 8236, 8288, 8289, 8290, 8291, 8292, 65279];
      if (unicodeZeroSpaces.includes(formatTitle.charCodeAt(idx))) {
        return '';
      }
      return item;
    }).join('');
    // console.log('formatTitle', formatTitle);
    if (formatTitle.length > 60) {
      formatTitle = formatTitle.substring(0, 60) + '...';
    }
    var anchor = document.createElement('a');
    let iconUrl = folderIcon;
    if (bookmarkNode.url) {
      anchor.setAttribute('data-href', bookmarkNode.url);
      // chrome://bookmarks 打开控制台 查找文件夹图标 chrome://bookmarks/images/folder_open.svg
      iconUrl = chrome.runtime.getURL(`_favicon/?pageUrl=${bookmarkNode.url}`);
    }
    anchor.setAttribute('title', bookmarkNode.title);
    // anchor.setAttribute('target', '_blank');
    anchor.innerHTML = `<img src="${iconUrl}" />${formatTitle}`;
  }
  // console.log('bookmarkNode.title', bookmarkNode.title, bookmarkNode.children);
  var li = document.createElement(bookmarkNode.title ? 'li' : 'div');
  li.append(anchor);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
function dumpTreeNodes(bookmarkNodes, query) {
  var ulEle = document.createElement('ul');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    ulEle.append(dumpNode(bookmarkNodes[i], query));
  }
  return ulEle;
}
function dumpBookmarks(query) {
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    // console.log('bookmarkTreeNodes', bookmarkTreeNodes);
    let newChilds = [];
    const roots = bookmarkTreeNodes[0].children;
    const isChromeOrEdgeFav = ['书签栏', '收藏夹栏'].includes(roots[0].title);
    if (isChromeOrEdgeFav) {
      newChilds = [...roots[0].children, roots[1]];
    }
    // 筛选出文件夹 布局到右边
    const bmLinks = [];
    const bmFolds = [];
    newChilds.forEach(item => {
      if (item.url) {
        bmLinks.push(item);
      } else {
        bmFolds.push(item);
      }
    });
    document.querySelector('#bookmarks').innerHTML = (`
      <div class="left">
        <div class="other">
          <a data-href="chrome://extensions/">扩展</a>
          <a data-href="chrome://bookmarks">书签</a>
        </div>
      </div>
      <div class="right"></div>
    `)
    document.querySelector('#bookmarks .left').append(dumpTreeNodes(bmLinks, query));
    document.querySelector('#bookmarks .right').prepend(dumpTreeNodes(bmFolds, query));
    document.querySelector('#bookmarks').addEventListener('click', async (e) => {
      const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      // chrome.tabs.create({ index: curTab.index + 1, url: e.target.href });
      // return;
      e.preventDefault();
      const targetUrl = e.target.getAttribute('data-href') || e.target.href;
      if (e.target?.tagName === 'A' && targetUrl) {
        curTab.index === 0 ? chrome.tabs.create({ index: curTab.index + 1, url: targetUrl }) : chrome.tabs.update({ url: targetUrl });
      }
    });
    document.querySelector('#bookmarks .right li').addEventListener('mouseover', (evt) => {
      const targetLi = evt.currentTarget;
      const submenu = targetLi.querySelector('ul');
      submenu.style.left = `-${Math.round(targetLi.offsetWidth * 1.3)}px`;
      submenu.style.top = '0px';
    })
  });
}

dumpBookmarks();


// https://stackoverflow.com/a/58965134/2190503
// https://stackoverflow.com/a/33523184/2190503
function resizer() {
  var resizer = document.querySelector('#resizerX');
  var sideIframe = document.getElementById('sideIframe');
  const mousemove = (evt) => {
    // return;
    sideIframe.style.width = `${evt.pageX}px`;
  };

  resizer.onmousedown = function () {
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }
  const doDrag = function (evt) {
    if (evt.which != 1) {
      console.log("mouseup");
      stopDrag(evt);
      return;
    }
    // 解决内部有 iframe 时 拖动卡顿 问题
    document.querySelectorAll('iframe').forEach(item => {
      item.style.pointerEvents = 'none';
    });
    mousemove(evt);
  }
  const stopDrag = async function (evt) {
    // console.log("stopDrag(evt)");
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    document.querySelectorAll('iframe').forEach(item => {
      item.style.pointerEvents = 'auto';
    });
    const saveWidth = `${sideIframe.offsetWidth / (window.innerWidth - 12) * 100}%`;
    await hl_extension_util.setStorage({ hl_sideWidth: saveWidth });
  }
}

const getSetStorage = {
  getInjectSites: async () => {
    const { hl_injectSites } = await hl_extension_util.getStorage();
    return hl_injectSites ? JSON.parse(hl_injectSites) : {};
  },
  setInjectSites: async (data) => {
    await hl_extension_util.setStorage({ hl_injectSites: JSON.stringify(data) });
  },
};

const createIfr = (src, min) => `
<div class="iframe-wrap ${min ? 'min' : ''}">
  <b>—</b>
  <a class="iframe-title text-nowrap" href="${src}" target="_blank">${src}</a>
  <iframe data-src="${src}" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"></iframe>
</div>
`;

// console.log('new tab page', chrome);

async function init () {
  const _injectSites = await getSetStorage.getInjectSites();
  const sideIframeUrl = Object.keys(_injectSites).find(url => _injectSites[url].sideOfPage);

  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  // 注意: webNavigation listener 在这里注册，当打开或刷新 浏览器其他 tab 页面时，这里都会执行回调。
  // 所以 executeScript 需要传入 curTab.id 并判断与打开的页面所在 tab 是否一致。
  chrome.webNavigation.onDOMContentLoaded.addListener(async details => {
    // console.log('webNavigation', curTab, details);
    if (details.url === 'about:blank' || details.tabId !== curTab.id) {
      return;
    }
    const injectionResults = await chrome.scripting.executeScript({
      target: {
        tabId: curTab.id,
        frameIds: [details.frameId]
      },
      func: (tabId) => {
        // alert('injected data');
        window.hl_extension_data = { tabId };
      },
      args: [curTab.id]
    });
    // console.log('injectionResults', injectionResults);
  });

  const sideIframe = document.querySelector('#sideIframe');
  if (sideIframeUrl) {
    sideIframe.querySelector('iframe').setAttribute('src', sideIframeUrl);
    sideIframe.querySelector('a').setAttribute('href', sideIframeUrl);
    sideIframe.querySelector('a').innerHTML = sideIframeUrl;
  }

  resizer()

  const { hl_sideWidth } = await hl_extension_util.getStorage();
  sideIframe.style.width = hl_sideWidth ?? '40%';

  const eTabContent = document.querySelector('#eTabContent');
  Object.entries(_injectSites).filter(([key, val]) => val.tabIdx).forEach(([url, urlProps]) => {
    const { tabIdx, tabName, tabLiStyle, min } = urlProps;
    const tArr = tabIdx.split('.');
    // 构造 bootstrap 需要的 tabs html 基本结构
    const eTabs = document.querySelector('#eTabs');
    if (!eTabs.querySelector(`[data-idx="${tArr[0]}"]`)) {
      eTabs.insertAdjacentHTML('beforeend', `<li role="presentation" data-idx="${tArr[0]}" style="${tabLiStyle}">
      <a href="#tabContent${tArr[0]}" data-toggle="tab">${tabName || '-'}</a>
      </li>`);
    }
    if (!eTabContent.querySelector(`#tabContent${tArr[0]}`)) {
      eTabContent.insertAdjacentHTML('beforeend', `<div class="tab-pane" id="tabContent${tArr[0]}" role="tabpanel"></div>`);
    }
    const tab0 = document.querySelector(`#tabContent${tArr[0]}`)
    if (tArr.length === 1) {
      tab0.insertAdjacentHTML('beforeend', createIfr(url, min));
    } else if (tArr.length === 2) {
      tab0.insertAdjacentHTML('beforeend', `<div class="tp-row" data-idx="${tabIdx}">${createIfr(url, min)}</div>`);
    } else if (tArr.length === 3) {
      const targetEle = () => tab0.querySelector(`[data-idx="${tArr[0]}.${tArr[1]}"]`);
      if (!targetEle()) {
        tab0.insertAdjacentHTML('beforeend', `<div class="tp-row" data-idx="${tArr[0]}.${tArr[1]}"></div>`);
      }
      targetEle().insertAdjacentHTML('beforeend', createIfr(url, min));
    }
  });

  const { hl_tabIndex } = await hl_extension_util.getStorage();
  const lis = document.querySelectorAll('#eTabs li');
  lis.forEach(item => item.addEventListener('click', async evt => {
    const ele = evt.currentTarget;
    const idx = ele.getAttribute('data-idx');
    const tabContent = document.querySelector(`#tabContent${idx}`);
    await hl_extension_util.setStorage({ hl_tabIndex: idx });
    const injectSites = await getSetStorage.getInjectSites();
    tabContent.querySelectorAll('iframe').forEach((item) => {
      const curUrl = item.getAttribute('data-src');
      if (!injectSites[curUrl].min) {
        item.setAttribute('src', curUrl);
      }
    });
    ele.parentNode.querySelectorAll('li').forEach((item, index) => {
      item.classList.remove('active');
      document.querySelector(`#tabContent${index}`).classList.remove('active');
    });
    ele.classList.add('active');
    tabContent.classList.add('active');
  }));
  lis[parseInt(hl_tabIndex ?? 0)].dispatchEvent(new Event('click', { bubbles: true }));

  document.querySelectorAll('.iframe-wrap b').forEach(item => {
    item.addEventListener('click', async evt => {
      const iframeWrap = evt.target.closest('.iframe-wrap');
      // const curA = evt.target.closest('.iframe-wrap > a');
      // const curA = evt.target.nextElementSibling;
      const curA = iframeWrap.querySelector('a');
      const curIframe = iframeWrap.querySelector('iframe');
      const curUrl = curA.getAttribute('href');
      const injectSites = await getSetStorage.getInjectSites();
      const { scrollHeight } = injectSites[curUrl] || {};
      injectSites[curUrl].min = !injectSites[curUrl]?.min;
      if (injectSites[curUrl].min) {
        iframeWrap.classList.add('min');
      } else {
        iframeWrap.classList.remove('min');
        curIframe.setAttribute('src', curUrl);
        if (scrollHeight) {
          iframeWrap.style.height = scrollHeight;
        }
      }
      await getSetStorage.setInjectSites(injectSites);
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('ssss', request, sender, sendResponse);
    if (request._ext) {
      void (async () => {
        const dUrl = decodeURIComponent(request._url);
        const injectSites = await getSetStorage.getInjectSites();
        const tabIdx = injectSites[dUrl].tabIdx?.split('.')[0];
        // 不改变第一个 tab 的名字
        if (Number(tabIdx) > 0 && request.title) {
          lis[Number(tabIdx)].querySelector('a').innerHTML = request.title;
          injectSites[dUrl].tabName = request.title;
        }
        if (request.scrollHeight != null) {
          injectSites[dUrl] = {
            ...(injectSites[dUrl] || {}),
            scrollHeight: request.scrollHeight,
          };
        }
        await getSetStorage.setInjectSites(injectSites);

        const iframeTitleEle = eTabContent.querySelector(`[href="${dUrl}"]`);
        // 只给 工具tab 内的 iframe 设置高度
        if (tabIdx === '0' && request.scrollHeight != null && iframeTitleEle) {
          iframeTitleEle.parentNode.style.height = request.scrollHeight;
        }
        // 没有 res 会报错吗 Unchecked runtime.lastError: The message port closed before a response was received.
        sendResponse({ success: true, data: injectSites });
      })();
    }
    return true;
  });
}
init();


const clipTxt = document.querySelector('#clipTxt');
clipTxt.addEventListener('input', async (evt) => {
  await chrome.storage.local.set({ hl_clipTxt: evt.target.value });
});

const manifest = chrome.runtime.getManifest()
// console.log('getManifest', chrome.runtime.getManifest());
document.querySelector("#clipCmd").innerHTML = ('按 ' + manifest.commands.addNote.suggested_key + ' 粘贴剪贴板内容');

const setHtml = url => {
  const iframeWrap = document.querySelector('#translateModal .iframe-wrap.google');
  iframeWrap.querySelector('iframe').setAttribute('src', url);
  iframeWrap.querySelector('a').setAttribute('href', url);
  iframeWrap.querySelector('a').innerHTML = url;
};
setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');

const translateModal = document.querySelector('#translateModal')
translateModal.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    toggleModal(false);
  }
});
let modalBackdrop;
const toggleModal = (isOpen) => {
  if (isOpen) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop', 'fade', 'in');
    translateModal.style = 'display: block;';
    translateModal.classList.add('in');
    document.body.classList.add('modal-open');
    document.body.append(modalBackdrop);
  } else {
    translateModal.style = 'display: none;';
    translateModal.classList.remove('in');
    document.body.classList.remove('modal-open');
    modalBackdrop?.remove();
    setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');
  }
};
let toggleState = true;
document.body.addEventListener('dblclick', () => {
  toggleState = !toggleModal;
  toggleModal(toggleModal);
  // $("#translateModal").modal('toggle');
});

const showModal = (request, sender, sendResponse) => {
  // console.log('msg bg aa', request, sender, location.href);
  if (request._bg && request.openModal) {
    toggleModal(true);
  }
  if (request._bg && request.newTranslateUrl) {
    // 来自 Google translate 消息
    setHtml(request.newTranslateUrl);
  }
  return true;
}
chrome.runtime.onMessage.addListener(showModal);

// 注册和使用快捷键 https://developer.chrome.com/docs/extensions/reference/commands
// chrome://extensions/shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  // console.log(`Command "${command}" triggered`, window, location.href);
  const clipText = await hl_extension_util.readClipboardText();
  if (command === 'openGoogTl') {
    const newTranslateUrl = `https://translate.google.com/?sl=zh-CN&tl=en&text=${clipText}&op=translate`
    // chrome.tabs.create({ url: '' });
    // 'chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/blank.html' can't be query.
    const queryTab = await chrome.tabs.query({ url: 'chrome://newtab/' });
    // console.log('curTab', queryTab);
    await chrome.tabs.highlight({tabs: queryTab[0].index});
    setTimeout(() => {
      showModal({
        _bg: true,
        openModal: 1,
        newTranslateUrl
      });
    }, 500);
  }
  if (command === 'addNote') {
    window.focus();
    // chrome.action.openPopup();
    chrome.action.setBadgeText({ text: 'cmd' });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '' });
    }, 2000);
    const localData = await chrome.storage.local.get();
    const newText = (localData.hl_clipTxt || '') + '\n' + clipText;
    // console.log('clip and new', clipText, newText);
    await chrome.storage.local.set({ hl_clipTxt: newText });
    clipTxt.value = newText;
  }
});
