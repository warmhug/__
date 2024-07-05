// console.log('options.js running');

const bdJs = `;(() => {
  const showSpecialEle = (ele) => {
    if (!ele) return;
    ele.parentNode.removeChild(ele);
    document.body.appendChild(ele);
    [...document.body.children].forEach(item => {
      if (item !== ele) {
        item.style.display = 'none';
      } else {
        ele.style.margin = '10px 0 0 30px';
      }
    });
  };
  console.log('inj bdjs', window.hl_extension_data, window.parent === window.top);
  showSpecialEle(document.querySelector('[srcid="51044"]'));
  showSpecialEle(document.querySelector('[srcid="5601"]'));
  window.postMessage(JSON.stringify({
    _ext: true,
    _url: location.href,
    scrollHeight: document.body.scrollHeight,
  }), '*');
})();`

const searchSwitch = `;(() => {
function createSearchSwitch(url) {
  const createContainer = () => {
    const container = document.createElement('div');
    container.setAttribute('data-flag', 'hl_search');
    container.style.cssText = 'position: fixed; right: 500px; top: 4px; z-index: 9999; opacity: 0.3;';
    document.body.append(container);
    return container;
  }
  const createLink = (container, href, text) => {
    const ele = document.createElement('a');
    ele.href = href;
    ele.innerText = text;
    ele.style.cssText = 'text-decoration: none; margin-right: 10px';
    container.appendChild(ele);
  }
  const urlObj = new URL(url || location.href);
  const searchEngines = ['google.com', 'bing.com', 'baidu.com'];
  const searchEngineNames = ['Goog', 'Bing', 'BD'];
  const createHref = (matchTxt, query) => 'https://www.' + matchTxt + '?' + query;
  console.log('run search', urlObj.pathname);
  if (['/', '/search'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[0])) {
    const query = urlObj.searchParams.get('q') || '';
    const container = createContainer();
    createLink(container, createHref(searchEngines[1] + '/search', 'q=' + query), searchEngineNames[1]);
    createLink(container, createHref(searchEngines[2] + '/s', 'wd=' + query), searchEngineNames[2]);
  } else if (['/', '/search'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[1])) {
    const query = urlObj.searchParams.get('q') || '';
    const container = createContainer();
    createLink(container, createHref(searchEngines[0] + '/search', 'q=' + query), searchEngineNames[0]);
    createLink(container, createHref(searchEngines[2] + '/s', 'wd=' + query), searchEngineNames[2]);
  } else if (['/', '/s'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[2])) {
    const query = urlObj.searchParams.get('wd') || '';
    const container = createContainer();
    createLink(container, createHref(searchEngines[0] + '/search', 'q=' + query), searchEngineNames[0]);
    createLink(container, createHref(searchEngines[1] + '/search', 'q=' + query), searchEngineNames[1]);
  }
}
createSearchSwitch();
// createSearchSwitch('https://www.google.com/search?q=ss&sca_esv=bb');
// createSearchSwitch('https://bing.com/search?q=js&ac=b')
// createSearchSwitch('https://www.baidu.com/s?wd=js')
})();`

const searchConfig = {
  allPage: true,
  js: searchSwitch,
};

const injectSites = {
  'https://www.google.com': searchConfig,
  'https://www.bing.com': searchConfig,
  'https://cn.bing.com': searchConfig,
  'https://www.baidu.com': searchConfig,
  'https://www.zhihu.com': {
    allPage: true,
    css: `
      .AppHeader.is-fixed {
        position: static;
      }
    `,
  },
  'https://translate.google.com/': {
    css: `
      body {
        overflow: hidden!important;
      }
    `,
  },
  'https://warmhug.github.io/__/': {
    tabIdx: '0.0',
    tabName: 'Samples',
    js: `;(() => {
      window.postMessage(JSON.stringify({
        _ext: true,
        _url: location.href,
        // title: ,
        scrollHeight: 1300,
      }), '*');
    })();`
  },
  [decodeURIComponent(`https://www.baidu.com/s?wd=%E6%97%A5%E5%8E%86`)]: {
    tabIdx: '0.2.0',
    min: 1,
    js: bdJs,
  },
  [decodeURIComponent(`https://www.baidu.com/s?wd=%E8%AE%A1%E7%AE%97%E5%99%A8`)]: {
    tabIdx: '0.2.1',
    min: 1,
    js: bdJs,
  },
  'https://ai-bot.cn/': {
    tabIdx: '1',
    tabName: 'AI工具'
  },
  'https://www.en998.com/sentence/': {
    tabIdx: '2',
    tabName: '句解霸'
  },
  [chrome.runtime.getURL('assets/mytool/index.html')]: {
    sideOfPage: true,
  },
  'https://i.mi.com/note/h5#/': {
    allPage: true,
    css: `
      #folderList {
        width: 100px;
      }
    `,
    js: `;(() => {
      setTimeout(() => {
        const linkEle = document.getElementById('pm-container')?.querySelectorAll('.ltr-element');
        linkEle?.forEach((item) => {
          // console.log('linkele', linkEle);
          item.addEventListener('dblclick', (evt) => {
            var text = evt.target.innerText;
            console.log(text);
            text.split(' ').forEach(http => {
              if (http.startsWith('http')) {
                window.open(http);
              }
            });
          });
        });
      }, 800);
    })();`
  },
  'https://note.temu.team': {
    allPage: true,
    css: `
      #main-root [data-testid="beast-core-resize-area"] {
        overflow: scroll !important;
      }
      #main-root [data-testid="beast-core-resize-area"] > div:last-child {
        width: 540px !important;
      }
    `,
  },
};

async function setOpt(ele, key, val) {
  const remoteData = await hl_extension_util.getStorage();
  if (!remoteData[key]) {
    hl_extension_util.setStorage({ [key]: JSON.stringify(val, null, 2) });
  }
  ele.value = (remoteData[key] || JSON.stringify(val, null, 2)).replace(/\\n/g, '\n');
  ele.addEventListener('input', (e) => {
    hl_extension_util.setStorage({ [key]: (e.target.value).replace(/\n/g, "") });
  });
}
setOpt(document.querySelector('.injectSites'), 'hl_injectSites', injectSites);

document.querySelector('#clearData').addEventListener('click', async () => {
  const remoteData = await hl_extension_util.getStorage();
  console.log('remoteData', JSON.stringify(remoteData, null, 2).replace(/\\n/g, '\n'));
  if (window.confirm('检查文本框或打开 console 确认要删除的数据')) {
    const removeRes = await hl_extension_util.removeStorage();
    console.log('removeRes', removeRes);
    location.reload();
  }
});
