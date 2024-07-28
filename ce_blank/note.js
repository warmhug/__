async function init() {
  // 压缩地址 https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js
  // api 地址 https://nhn.github.io/tui.editor/latest/  对原 js 有改动
  const el = document.querySelector('#tuiEditor');
  const tuiEditor = new toastui.Editor({
    el,
    height: '650px',
    previewStyle: 'tab',
    initialEditType: 'wysiwyg', // markdown
    extendedAutolinks: true,
    linkAttributes: {
      target: '_blank',
    },
    toolbarItems: [['italic', 'strike', 'hr', 'ul', 'ol'], ['table', 'image', 'link']],
    initialValue: '',
    events: {
      // change keyup 区别
      // change: async (aa) => {
      keyup: async (aa) => {
        // const html = tuiEditor.getHTML();
        let content = tuiEditor.getMarkdown();
        // console.log('content: ', content);
        // 有时候这里会触发 空值 问题，此时不能更改本地存储、不然数据就没了
        if (content.toString().length < 3) {
          alert('字符长度小于 3 可能是出现bug，操作暂时中断');
          return;
        }
        if (chrome?.runtime?.sendNativeMessage) {
          // 在 bash 脚本里比如 `echo * xxx` 其中的 * 是特殊字符、需要处理。
          content = JSON.stringify(content);
          try {
            const response = await chrome.runtime.sendNativeMessage('nm_sh', {
              message: 'setNote',
              content,
            });
            // console.log('接收到消息:', response);
          } catch (error) {
            console.log('error: ', error);
          }
        }
        // 硬盘内容可能失效，在 localestorage 做备份
        await hl_extension_util.setStorage({ hl_notesTxt: content }, false);
      }
    }
  });
  let hl_notesTxt;
  if (chrome?.runtime?.sendNativeMessage) {
    try {
      const response = await chrome.runtime.sendNativeMessage('nm_sh', {
        message: 'getNote',
      });
      // console.log('接收到消息:', response);
      hl_notesTxt = response.content;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  if (!hl_notesTxt || hl_notesTxt.length < 3) {
    hl_notesTxt = (await hl_extension_util.getStorage(undefined, false)).hl_notesTxt;
  }
  tuiEditor.setMarkdown(hl_notesTxt);
  // 点击打开链接
  el.addEventListener('dblclick', (evt) => {
    // 把 .toastui-editor-contents 元素的 contenteditable 设为 false ，内部的 链接 就能自动跳转
    // console.log('tar', evt.target.tagName, editor.isWysiwygMode());
    if (evt?.target?.tagName === 'A' && evt?.target?.href && tuiEditor.isWysiwygMode()) {
      // 因为 evt?.target?.href 里的 & 号被转义、导致跳转不对，所以用 innerText
      // window.open(evt?.target?.innerText);
      window.top.location.href = evt?.target?.innerText;
    }
  });

  const renderNotes = () => {
    const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min) ) + min;
    const randomIndex = getRndInteger(2, resArray.length - 1);
    document.querySelector('#importTxt').innerHTML = `
      ${resArray[randomIndex] || ''}<br>
      ${resArray[randomIndex + 1] || ''}
    `;
  };
  const { hl_importTxt = '' } = await hl_extension_util.getStorage(undefined, false)
  var resArray = hl_importTxt.split('\n').filter(item => item && item != '\r');
  renderNotes();
  document.querySelector('#importBtn').addEventListener('click', async () => {
    if (resArray?.length && window.confirm('使用缓存的内容？')) {
      return;
    }
    const filesHandle = await window.showOpenFilePicker({
      types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      multiple: true
    });
    const fileContents = await Promise.all(filesHandle.map(async (fileHandle) => {
      const file = await fileHandle.getFile();
      const contents = await file.text();
      // console.log('ccc', contents);
      return contents;
    }));
    await hl_extension_util.setStorage({ hl_importTxt: fileContents.join() }, false);
    alert('写入本地存储成功');
  });
  document.querySelector('#changeTxt').addEventListener('click', renderNotes);

  hl_extension_util.getLocalIPs(function (ips) {
    localIP = 'http://' + ips[0] + '';
    // console.log('localIp', localIP);
    const ipEle = document.querySelector('#ip');
    ipEle.setAttribute('href', localIP);
    ipEle.innerHTML = localIP;
  });

  document.querySelector('#syncInter').addEventListener('click', (e) => {
    chrome.tabs.create({url: e.target.href});
  });

  // console.log('ll', location.pathname, window.parent.document);
  // chrome-extension 协议的链接，不能插入 content_scripts 可以直接调用 chrome api
  // chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/assets/mytool/index.html
  chrome?.runtime?.sendMessage({
    _ext: true,
    _url: location.href,
    scrollHeight: document.body.scrollHeight,
  }, (response) => {});
  // window.postMessage(JSON.stringify({
  //   _ext: true,
  //   _url: location.href,
  //   scrollHeight: document.body.scrollHeight,
  // }), '*');

}
init();
