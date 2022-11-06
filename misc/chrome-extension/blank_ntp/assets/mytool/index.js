function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
// get local ip https://github.com/dlo83/local-ip-chrome-extension
function getLocalIPs(callback) {
  var ips = [];
  var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel('');
  pc.onicecandidate = function (e) {
    if (!e.candidate) { // Candidate gathering completed.
      pc.close();
      callback(ips);
      return;
    }
    var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
    if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
      ips.push(ip);
  };
  pc.createOffer(function (sdp) {
    pc.setLocalDescription(sdp);
  }, function onerror() { });
}

const setStorageNote = async (data) => {
  if (!chrome?.storage?.local) {
    localStorage.setItem('notesTxt', data);
  } else {
    await hl_extension_util.setStorage({ notesTxt: data });
  }
}
const getStorageNote = async (kv) => {
  if (!chrome?.storage?.local) {
    return localStorage.getItem('notesTxt');
  }
  const nt = await hl_extension_util.getStorage();
  // console.log('nt', nt);
  return nt.notesTxt;
}

$(async function () {
  // 压缩地址 https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js
  // api 地址 https://nhn.github.io/tui.editor/latest/  对原 js 有改动
  const el = document.querySelector('#tuiEditor');
  const tuiEditor = new toastui.Editor({
    el,
    height: '450px',
    previewStyle: 'tab',
    initialEditType: 'wysiwyg', // markdown
    extendedAutolinks: true,
    linkAttributes: {
      target: '_blank',
    },
    toolbarItems: [['italic', 'strike', 'hr', 'ol'], ['table', 'image', 'link']],
    initialValue: '',
    events: {
      // change: async (aa) => {
      keyup: async (aa) => {
        await setStorageNote(tuiEditor.getMarkdown());
      }
    }
  });
  const newlValue = await getStorageNote();
  tuiEditor.setMarkdown(newlValue);
  // 点击打开链接
  el.addEventListener('click', (evt) => {
    // 把 .toastui-editor-contents 元素的 contenteditable 设为 false ，内部的 链接 就能自动跳转
    // console.log('tar', evt.target.tagName, editor.isWysiwygMode());
    if (evt?.target?.tagName === 'A' && evt?.target?.href && tuiEditor.isWysiwygMode()) {
      // 因为 evt?.target?.href 里的 & 号被转义、导致跳转不对，所以用 innerText
      window.open(evt?.target?.innerText);
    }
  });
});

$(function () {
  const dbKey = 'ce_fileContent';
  var resArray;
  const getContents = async () => {
    try {
      // https://web.dev/file-system-access/  get set 方法来自 idb-keyval@5.0.2 操作 IndexedDB
      const fileHandleOrUndefined = await get(dbKey);
      if (fileHandleOrUndefined) {
        return fileHandleOrUndefined;
      }
    } catch (error) { alert(error.name, error.message); }
  }
  const loadNotes = async () => {
    if (resArray?.length && window.confirm('使用 IndexedDB 里的内容？')) {
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
    try {
      await set(dbKey, fileContents.join());
      alert('选择的内容写入 IndexedDB 成功');
      // location.reload();
    } catch (error) { alert(error.name, error.message); }
  };

  $('#notesLoad').click(loadNotes);

  var notesTxt = $('#notesTxt');
  getContents().then(res => {
    if (res) {
      resArray = res.split('\n').filter(item => item && item != '\r');
      notesTxt.html(resArray[getRndInteger(2, resArray.length)]);
    }
  });

  $('#changeNote').click(function () {
    const txt = resArray[getRndInteger(2, resArray.length)];
    notesTxt.html(txt);
  });
  notesTxt.hide();
  $('#notesImg').click(function () {
    notesTxt.toggle();
    $(this).toggleClass('small');
  });

  getLocalIPs(function (ips) {
    localIP = 'http://' + ips[0] + '';
    // console.log('localIp', localIP);
    $('#ip').attr('href', localIP).html(localIP);
  });

  $('#syncInter').click((e) => {
    chrome.tabs.create({url: e.target.href});
  });

  // console.log('ll', location.pathname, window.parent.document);
  window.postMessage(JSON.stringify({
    _ext: true,
    _url: location.href,
    scrollHeight: document.body.scrollHeight,
  }), '*');

});
