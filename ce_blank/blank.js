// 2022-01-16 from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/bookmarks/basic/popup.js

// console.log('cb', chrome.bookmarks);

function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    // html 0宽字符: U+200B  U+200C  U+200D   U+FEFF  &zwnj;&ZeroWidthSpace;&#xFEFF
    // 使用 正则替换、jQuery 的 html() 方法处理 都没效果。
    let formatTitle = bookmarkNode.title
      // .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // console.log('unicode', formatTitle, formatTitle.length, formatTitle.charAt(0));
    // formatTitle = $('<div />').html(formatTitle).text();
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
    var anchor = $('<a>');
    anchor.attr('data-href', bookmarkNode.url);
    anchor.attr('title', bookmarkNode.title);
    // anchor.attr('target', '_blank');
    anchor.text(formatTitle);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    // anchor.on('click', () => { });
    // https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api/favicon/content.js
    // console.log('rt', chrome.runtime.getURL('_favicon/?page_url=https://www.google.com&size=64'));
    // chrome://bookmarks 打开控制台 查找文件夹图标 chrome://bookmarks/images/folder_open.svg
    const iconUrl = bookmarkNode.url ?
      chrome.runtime.getURL(`_favicon/?pageUrl=${bookmarkNode.url}`) : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzQyODVGNCI+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=';
    anchor.prepend(`<img src="${iconUrl}" />`);
  }
  // console.log('bookmarkNode.title', bookmarkNode.title, bookmarkNode.children);
  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(anchor);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
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
    // for back
    // const bms = dumpTreeNodes(newChilds, query);
    // $('#bookmarks').prepend(bms);
    // // https://api.jqueryui.com/menu/
    // bms.menu({
    //   // position: { my: "left top", at: "right-5 top+5" }
    // });
    $('#bookmarks').html(`
      <div class="left">
        <div class="other">
          <a data-href="chrome://extensions/">扩展</a>
          <a data-href="chrome://bookmarks">书签</a>
        </div>
      </div>
      <div class="right"></div>
    `).click(async (e) => {
      const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      // chrome.tabs.create({ index: curTab.index + 1, url: e.target.href });
      // alert(`curTab: ${curTab.index}, ${curTab.url}`);
      console.log('ttt', curTab, e.target, e.target.getAttribute('data-href'));
      // return;
      e.preventDefault();
      const targetUrl = e.target.getAttribute('data-href') || e.target.href;
      if (e.target?.tagName === 'A' && targetUrl) {
        curTab.index === 0 ? chrome.tabs.create({ index: curTab.index + 1, url: targetUrl }) : chrome.tabs.update({ url: targetUrl });
      }
    });
    $('#bookmarks .left').append(dumpTreeNodes(bmLinks, query));
    $('#bookmarks .right').prepend(dumpTreeNodes(bmFolds, query).menu());
  });
}

dumpBookmarks();



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

console.log('new tab page', chrome);

$(async function () {
  const _injectSites = await getSetStorage.getInjectSites();
  const sideIfrUrl = Object.keys(_injectSites).find(url => _injectSites[url].sideOfPage);

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

  if (sideIfrUrl) {
    $('#sideIframe').find('iframe').attr('src', sideIfrUrl);
    $('#sideIframe').find('a').attr('href', sideIfrUrl).html(sideIfrUrl);
  }

  Object.entries(_injectSites).filter(([key, val]) => val.tabIdx).forEach(([url, urlProps]) => {
    const { tabIdx, tabName, tabLiStyle, min } = urlProps;
    const tArr = tabIdx.split('.');
    // 构造 bootstrap 需要的 tabs html 基本结构
    if (!$('#eTabs').find(`[data-idx="${tArr[0]}"]`).length) {
      $('#eTabs').append(`<li role="presentation" data-idx="${tArr[0]}" style="${tabLiStyle}">
      <a href="#tabContent${tArr[0]}" data-toggle="tab">${tabName || '-'}</a>
      </li>`);
    }
    if (!$('#eTabContent').find(`#tabContent${tArr[0]}`).length) {
      $('#eTabContent').append(`<div class="tab-pane" id="tabContent${tArr[0]}" role="tabpanel"></div>`);
    }
    if (tArr.length === 1) {
      $(`#tabContent${tArr[0]}`).append(createIfr(url, min));
    } else if (tArr.length === 2) {
      $(`#tabContent${tArr[0]}`).append(`<div class="tp-row" data-idx="${tabIdx}">${createIfr(url, min)}</div>`);
    } else if (tArr.length === 3) {
      const targetEle = () => $(`#tabContent${tArr[0]}`).find(`[data-idx="${tArr[0]}.${tArr[1]}"]`);
      if (!targetEle().length) {
        $(`#tabContent${tArr[0]}`).append(`<div class="tp-row" data-idx="${tArr[0]}.${tArr[1]}"></div>`);
      }
      targetEle().append(createIfr(url, min));
    }
  });

  const { hl_tabIndex } = await hl_extension_util.getStorage();
  $('#eTabs li').click(async e => {
    const ele = $(e.currentTarget);
    ele.find('a').tab('show');
    const idx = ele.data('idx');
    await hl_extension_util.setStorage({ hl_tabIndex: idx });
    const ifrs = $(`#tabContent${idx}`).find('iframe');
    ifrs.attr('src', (ind, val) => val ? undefined : $(ifrs[ind]).attr('data-src'));
  }).eq(parseInt(hl_tabIndex ?? 0)).trigger("click");

  $('.iframe-wrap b').click(async e => {
    const curUrl = $(e.target).siblings('a').attr('href');
    const iframeWrap = $(e.target).parent('.iframe-wrap');
    const injectSites = await getSetStorage.getInjectSites();
    const { scrollHeight, min } = injectSites[curUrl] || {};
    if (!min) {
      injectSites[curUrl].min = 1;
      iframeWrap.addClass('min');
    } else if (scrollHeight) {
      injectSites[curUrl].min = 0;
      iframeWrap.removeClass('min').height(scrollHeight);
    }
    await getSetStorage.setInjectSites(injectSites);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('ssss', request, sender, sendResponse);
    if (request._ext) {
      void (async () => {
        const dUrl = decodeURIComponent(request._url);
        const injectSites = await getSetStorage.getInjectSites();
        const tabIdx = injectSites[dUrl].tabIdx.split('.')[0];
        // 不改变第一个 tab 的名字
        if (Number(tabIdx) > 0 && request.title) {
          $('#eTabs li').eq(tabIdx).find('a').html(request.title);
          injectSites[dUrl].tabName = request.title;
        }
        if (request.scrollHeight != null) {
          injectSites[dUrl] = {
            ...(injectSites[dUrl] || {}),
            scrollHeight: request.scrollHeight,
          };
        }
        await getSetStorage.setInjectSites(injectSites);

        const iframeTitleEle = $('#eTabContent').find(`[href="${dUrl}"]`);
        // 只给 工具tab 内的 iframe 设置高度
        if (tabIdx === '0' && request.scrollHeight != null && iframeTitleEle) {
          iframeTitleEle.parent().height(request.scrollHeight);
        }
        // 没有 res 会报错吗 Unchecked runtime.lastError: The message port closed before a response was received.
        sendResponse({ success: true, data: injectSites });
      })();
    }
    return true;
  });

  $('#sideIframe').resizable({
    handles: 'e',
    containment: "parent",
    start: function(event, ui) {
      // 解决内部有 iframe 时 拖动卡顿 问题
      $('iframe').css('pointer-events','none');
    },
    stop: async function(event, ui) {
      $('iframe').css('pointer-events','auto');
      const { width } = ui.size;
      const saveWidth = `${width / (window.innerWidth - 12) * 100}%`;
      await hl_extension_util.setStorage({ hl_sideWidth: saveWidth });
    }
  });

  const { hl_sideWidth } = await hl_extension_util.getStorage();
  $('#sideIframe').width(hl_sideWidth ?? '40%');
});



$('#clipTxt').on('change', async (e) => {
  await chrome.storage.local.set({ hl_clipTxt: e.target.value });
});

const manifest = chrome.runtime.getManifest()
// console.log('getManifest', chrome.runtime.getManifest());
$("#clipCmd").html('按 ' + manifest.commands.addNote.suggested_key + ' 粘贴剪贴板内容');

const setHtml = url => {
  const iframeWrap = $('#translateModal').find('.iframe-wrap.google');
  iframeWrap.find('iframe').attr('src', url);
  iframeWrap.find('a').attr('href', url).html(url);
};
setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');

$('body').dblclick(() => {
  $("#translateModal").modal('toggle');
});
$('#translateModal').on('hidden.bs.modal', function (e) {
  setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');
});

const showModal = (request, sender, sendResponse) => {
  // console.log('msg bg aa', request, sender, location.href);
  if (request._bg && request.openModal) {
    $("#translateModal").modal('show');
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
    $('#clipTxt').val(newText);
  }
});
