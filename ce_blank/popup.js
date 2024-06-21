// 在 popup 页面右键 查看元素 看控制台
// console.log('when exec?');

let port = null;
function connect() {
  // 双向通信
  port = chrome.runtime.connectNative('nm_nodejs');
  port.onMessage.addListener((msg) => {
    console.log('Received message from native: ', msg);
  });
  port.onDisconnect.addListener((p) => {
    console.log('Disconnected', chrome.runtime.lastError);
    port = null;
  });
}
// connect();

// 防止休眠或屏幕关闭
// https://chrome.google.com/webstore/detail/keep-computer-awake-for-a/imbpigcghoambmanjekibelfjemnnool
async function popup () {
  const [curTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const localData = await chrome?.storage?.local.get();

  const manifest = chrome.runtime.getManifest()
  // console.log('getManifest', chrome.runtime.getManifest());
  // .replaceAll('\n', '<br/>')
  document.querySelector('#cmds').innerHTML = JSON.stringify(manifest.commands, null, 4);

  // 显示插入到当前页面的 js css 内容
  const injectSites = JSON.parse(localData.hl_injectSites) || {};
  const matchUrl = hl_extension_util.getMatchUrl(Object.keys(injectSites), decodeURIComponent(curTab.url));
  if (matchUrl && injectSites[matchUrl].allPage) {
    document.querySelector('#injectCode').innerHTML = `
      此页面被插入 css 或 js 如下:
      <pre>${injectSites[matchUrl].css}</pre>
      <pre>${injectSites[matchUrl].js || ''}</pre>
    `;
  }

  document.querySelector('#reloadPage').addEventListener('click', () => {
    // 销毁页面 再重新加载
    chrome.tabs.discard(curTab.id);
    chrome.tabs.reload();
    // chrome.tabs.update(curTab.id, {url: curTab.url});
  });

  document.querySelector('#openProxy').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://settings/system' });
  });

  document.querySelector('#openNativeApp').addEventListener('click', () => {
    // 单向通信
    // chrome.runtime.sendNativeMessage('nm_nodejs', {message: 'aaa'}, function (response) {
    //   console.log('接收到消息:\n', response);
    // });
    // return;
    connect();
    setTimeout(() => {
      port.postMessage({message: 'aaa'});
    }, 3000)
  });

  document.querySelector('#resizeWindow').addEventListener('click', () => {
    chrome.windows.getCurrent(function(wind) {
      var maxWidth = window.screen.availWidth;
      var maxHeight = window.screen.availHeight;
      // alert(wind.id);alert(maxWidth);alert(maxHeight);
      var updateInfo = {
          // left: 0, //change those to whatever you like
          // top: 0,
          // height: maxHeight
          width: 1728,
      };
      chrome.windows.update(wind.id, updateInfo);});
  });

  const powerMode = localData?.hl_power || 'default';
  document.querySelector('#powerOps input[type="radio"]')?.filter('[value="' + powerMode + '"]').attr('checked', true);
  document.querySelector('#powerOps input[type="radio"]')?.change(async function(e) {
    console.log('ee', e.target);
    switch (e.target.value) {
      case 'display':
      case 'system':
        chrome?.power?.requestKeepAwake(e.target.value);
        await chrome?.storage?.local.set({ hl_power: e.target.value });
        break;
      default:
        chrome?.power?.releaseKeepAwake();
        await chrome?.storage?.local.set({ hl_power: '' });
        break;
    }
  });

  // chrome.power.reportActivity(() => {
  //   console.log('reportActivity');
  // });
}
popup();
