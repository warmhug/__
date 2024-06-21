document.addEventListener('hl_extension_message', (event) => {
  // console.log('eddd', event.detail, event.path);

  // 这里的 window 和 content_script.js 里的 window 不是同一个。
  // console.log('hl_extension_util', window.hl_extension_data?.tabId, window.hl_extension_util);

  // console.log('pass obj', event.detail);
  window.hl_extension_data = event.detail?.hl_extension_data;

  eval(event.detail?.js || '');

  // eval 的函数字符串里 有 async 会报错。
  // eval(";(async () => {" + (event.detail?.js || '') + "})();");
  // ;(async () => {
  //   await eval(event.detail?.js || '');
  // })();
});
