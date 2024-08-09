// 在 popup 页面右键 查看元素 看控制台
// console.log('when exec?');

function displayProcessInfo(process, table) {
  // Format network string like task manager
  var network = process.network;
  if (network > 1024) {
    network = (network / 1024).toFixed(1) + " kB/s";
  } else if (network > 0) {
    network += " B/s";
  } else if (network == -1) {
    network = "N/A";
  }

  table +=
    "<tr><td>" + process.id + "</td>" +
    "<td>" + process.osProcessId + "</td>" +
    "<td>" + process.title + "</td>" +
    "<td>" + process.type + "</td>" +
    "<td>" + process.tabs + "</td>" +
    "<td>" + process.cpu + "</td>" +
    "<td>" + network + "</td>";

  if ("privateMemory" in process) {
    table += "<td>" + (process.privateMemory / 1024) + "K</td>";
  } else {
    table += "<td>N/A</td>";
  }
  if ("jsMemoryAllocated" in process) {
    var allocated = process.jsMemoryAllocated / 1024;
    var used = process.jsMemoryUsed / 1024;
    table += "<td>" + allocated.toFixed(2) + "K (" + used.toFixed(2) +
        "K live)</td>";
  } else {
    table += "<td>N/A</td>";
  }

  table +=
    "<td></td>" +
    "</tr>\n";
  return table;
}

let port = null;
function connect(name) {
  // 双向通信
  port = chrome.runtime.connectNative(name);
  port.onMessage.addListener((msg) => {
    console.log('Received message from native: ', msg);
  });
  port.onDisconnect.addListener((p) => {
    console.log('Disconnected', chrome.runtime.lastError);
    port = null;
  });
}
// connect();

const getNow = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}`;
};

function downloadBase64File(base64String, fileName) {
  // const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = base64String;
  downloadLink.download = fileName || getNow() + '.jpeg';
  downloadLink.click();
}

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
      ${injectSites[matchUrl].css ? `<pre>${injectSites[matchUrl].css}</pre>` : ''}
      ${injectSites[matchUrl].js ? `<pre>${injectSites[matchUrl].js}</pre>` : ''}
    `;
  }

  const bg = chrome.extension.getBackgroundPage();
  const views = chrome.extension.getViews();
  // console.log('views', bg, views);
  document.querySelector('#reloadPage').addEventListener('click', () => {
    chrome.tabs.discard(curTab.id);
    // 卡死页面的代码
    // javascript:[...Array(2**32-1)].map(_=>Math.ceil(Math.random()*111))

    // const curUrl = location.href;
    // chrome.tabs.update({ url: 'chrome://on-device-internals' });
    // chrome.tabs.update({ url: 'about:blank#blocked' });
    // setTimeout(() => { location.href = curUrl; alert(location.href) }, 1000)
    // chrome.tabs.create({ url: 'chrome://about/', index: curTab.index + 1 });
    // chrome.runtime.sendMessage({destroy: true, curTabId: curTab.id}, (response) => {
    //   console.log('received user data', response);
    // });
  });
  document.querySelector('#reloadPage').addEventListener('dblclick', () => {
    chrome.tabs.discard(curTab.id);
    chrome.tabs.reload();
  });

  document.querySelector('#snapshot').addEventListener('click', () => {
    chrome.tabs.captureVisibleTab((dataUrl) => {
      const url = dataUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20image.png;');
      console.log('dataUrl: ', dataUrl, url);
      // return;
      downloadBase64File(url);
      // chrome.tabs.create({ url });
    });
  });

  document.querySelector('#top').addEventListener('click', () => {
    window.open('http://localhost:7681/?disableLeaveAlert=true&arg=/Users/hua/inner/-/__/ce_blank/webshell.sh&arg=top');
  });
  document.querySelector('#ai').addEventListener('click', () => {
    const urls = [
      'https://cowizard.temu.team/chat/',
      'https://www.doubao.com/',
      'https://kimi.moonshot.cn/',
      // 'https://tongyi.aliyun.com/qianwen/',
      // 'https://app.chathub.gg/',
      // 'https://chatgpt.com/',
    ];
    const funcs = [
      () => {
        setTimeout(async () => {
          const clipText = await hl_extension_util.readClipboardText();
          const input = document.querySelector('.stChatInput textarea');
          // console.log('input: ', input);
          input.focus();
          input.value = clipText;
          // input.dispatchEvent(new Event('change'));
          input.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            document.querySelector('.stChatInput button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
          }, 500);
        }, 5000);
      },
      () => {
        setTimeout(async () => {
          const clipText = await hl_extension_util.readClipboardText();
          const input = document.querySelector('.semi-input-textarea-wrapper textarea');
          // console.log('input: ', input);
          input.focus();
          input.value = clipText;
          // input.dispatchEvent(new Event('change'));
          input.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            document.querySelector('.send-btn-wrapper button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
          }, 500);
        }, 5000);
      },
    ];
    urls.forEach((url, idx) => {
      chrome.tabs.create({ url, active: false }, async (newTab) => {
        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId : newTab.id },
          func: funcs[idx],
        });
        console.log('newTab: ', newTab);
        console.log('injectionResults: ', injectionResults);
      });
    });
  });

  chrome.proxy.settings.get({'incognito': false}, function(config) {
    console.log('chrome.proxy', JSON.stringify(config));
  });
  const popover = document.querySelector('[popover]');
  const highLightMsg = async () => {
    const { hl_proxy: proxyType } = await hl_extension_util.getStorage();
    const msg = document.querySelector('#setProxy .msg');
    msg.innerHTML = '';
    if (proxyType === 'whistle') {
      msg.innerHTML = '命令行运行 w2 start/proxy, 访问 &nbsp; <a href="http://127.0.0.1:8899" target="_blank">http://127.0.0.1:8899</a>';
    } else if (proxyType === 'clash') {
      const btn = document.createElement('button');
      btn.innerHTML = '添加规则';
      btn.addEventListener('click', async () => {
        const host = new URL(curTab.url).host;
        // console.log('curTab', curTab, host);
        const response = await chrome.runtime.sendNativeMessage('nm_sh', {
          message: 'addRule',
          content: host,
        });
        console.log('接收到消息:', response);
        // popover.togglePopover();
        popover.showPopover();
        setTimeout(() => popover.hidePopover(), 3000);
      });
      const span = document.createElement('span');
      span.innerHTML = `访问
        <a href="https://vscode.dev/" target="_blank">https://vscode.dev</a> &nbsp;
        <a href="http://127.0.0.1:58147/ui/#/rules" target="_blank">http://127.0.0.1:58147</a>
      `;
      msg.appendChild(btn);
      msg.appendChild(span);
    }
  };
  const highLightBtn = async () => {
    const { hl_proxy: proxyType } = await hl_extension_util.getStorage();
    document.querySelectorAll('#setProxy .controls button').forEach(item => {
      if (item.textContent === proxyType) {
        item.style.backgroundColor = '#cddf8e';
      } else {
        item.style.backgroundColor = '';
      }
    });
  };
  highLightMsg();
  highLightBtn();
  document.querySelector('#setProxy .controls').addEventListener('click', async (evt) => {
    const proxyType = evt.target.tagName === 'BUTTON' ? evt.target.textContent : 'openMacConfig';
    if (proxyType && evt.target.tagName === 'BUTTON') {
      await hl_extension_util.setStorage({ hl_proxy: proxyType });
    }
    highLightMsg();

    // chrome.tabs.create({ url: 'chrome://settings/system' });
    // 单向通信
    try {
      const response = await chrome.runtime.sendNativeMessage('nm_sh', { message: proxyType });
      console.log('接收到消息:', response);
      // alert(JSON.stringify(response));
    } catch (error) {
      console.log('error: ', error);
    }
    highLightBtn();
    return;
    connect('nm_sh');
    port.postMessage({ message: proxyType });
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
  document.querySelectorAll('#powerOps input[type="radio"]').forEach(item => {
    if (item.getAttribute('value') === powerMode) {
      item.setAttribute('checked', true);
    }
    item.addEventListener('change', async function(e) {
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
    })
  });

  // chrome.power.reportActivity(() => {
  //   console.log('reportActivity');
  // });

  // https://developer.chrome.com/docs/extensions/reference/api/processes?hl=zh-cn
  // 开发者版浏览器可用 https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pyAzuN4neHc
  console.log('chrome.processes: ', chrome.processes);
  console.log('chrome.processes: ', chrome?.experimental, chrome?.experimental?.processes);
  chrome.processes?.onUpdatedWithMemory.addListener(
    function(processes) {
      var table = "<table>\n" +
        "<tr><td><b>Process</b></td>" +
        "<td>OS ID</td>" +
        "<td>Title</td>" +
        "<td>Type</td>" +
        "<td>Tabs</td>" +
        "<td>CPU</td>" +
        "<td>Network</td>" +
        "<td>Private Memory</td>" +
        "<td>JS Memory</td>" +
        "<td></td>" +
        "</tr>\n";
      for (pid in processes) {
        table = displayProcessInfo(processes[pid], table);
      }
      table += "</table>\n";
      var div = document.getElementById("process-list");
      div.innerHTML = table;
    });

  document.getElementById("killProcess").onclick = function () {
    var procId = parseInt(prompt("Enter process ID"));
    chrome.processes.terminate(procId);
  }
}
popup();
