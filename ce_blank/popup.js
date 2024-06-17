// 在 popup 页面右键 查看元素 看控制台
// console.log('when exec?');
// alert('每次打开都会执行');

// 防止休眠或屏幕关闭
// https://chrome.google.com/webstore/detail/keep-computer-awake-for-a/imbpigcghoambmanjekibelfjemnnool
$(async function() {
  const [curTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const localData = await chrome?.storage?.local.get();

  const manifest = chrome.runtime.getManifest()
  // console.log('getManifest', chrome.runtime.getManifest());
  // $('#cmds').html(JSON.stringify(manifest.commands, null, 4).replaceAll('\n', '<br/>'));
  $('#cmds').html(JSON.stringify(manifest.commands, null, 4));

  // 显示插入到当前页面的 js css 内容
  const injectSites = JSON.parse(localData.hl_injectSites) || {};
  const matchUrl = hl_extension_util.getMatchUrl(Object.keys(injectSites), decodeURIComponent(curTab.url));
  if (matchUrl && injectSites[matchUrl].allPage) {
    $('#injectCode').html(`
      此页面被插入 css 或 js 如下:
      <pre>${injectSites[matchUrl].css}</pre>
      <pre>${injectSites[matchUrl].js || ''}</pre>
    `);
  }

  $('#resizeWindow').click(() => {
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
  $('#reloadPage').click(() => {
    // 销毁页面 再重新加载
    chrome.tabs.discard(curTab.id);
    chrome.tabs.reload();
    // chrome.tabs.update(curTab.id, {url: curTab.url});
  });

  const powerMode = localData?.hl_power || 'default';
  $('#powerOps input[type="radio"]').filter('[value="' + powerMode + '"]').attr('checked', true);
  $('#powerOps input[type="radio"]').change(async function(e) {
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
});
