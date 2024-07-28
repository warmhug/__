// console.log('this is injected to all pages (ISOLATED window object)', window, chrome);

// for test
window.hl_extension_util = hl_extension_util;

const hl_asyncSendMessage = (req) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(req, (response) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

// content_scripts 和插入进 iframe 里边的 inject-sub.js 内容通信
const hl_handleMsg = async (event) => {
  // 注意 这里可能会多次收到不同来源的消息
  // console.log('message from other', event);
  let parsedData;
  try {
    parsedData = JSON.parse(event.data);
  } catch {
    parsedData = {};
  }
  if (parsedData._ext) {
    await hl_asyncSendMessage(parsedData);
  }
};
window.addEventListener("message", hl_handleMsg);
setTimeout(() => {
  // 初始化完成，不再处理 message 消息、避免对原有页面的性能影响。需要配合 option.js 里的内容
  window.removeEventListener("message", hl_handleMsg);
}, 8000);

// 处理来自 service-worker 里的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log('msg bg', request, sender, location.href);
  if (request._bg && location.href.indexOf(request._url) === 0) {
    // 来自 Google translate 消息
    if (request.newTranslateUrl) {
      location.href = request.newTranslateUrl;
    }
    // 来自其他标记
    if (request.clipChanged) {
      console.log('clipChanged', requet);
    }
  }
  return true;
});

// 参考 Video Speed Controller https://chromewebstore.google.com/detail/nffaoalbilbmmfgbnbgppjihopabppdk
// 测试地址 https://shapeshed.com/examples/HTML5-video-element/
async function videoSpeedController() {
  const { hl_videoSpeed = 2 } = await hl_extension_util.getStorage();
  const controlEle = (video) => {
    const rect = video.getBoundingClientRect();
    const offsetRect = video.offsetParent?.getBoundingClientRect();
    const top = Math.max(rect.top - (offsetRect?.top || 0), 0);
    const left = Math.max(rect.left - (offsetRect?.left || 0), 0);
    const input = document.createElement('input');
    input.setAttribute('name', 'hl_video_controller');
    input.setAttribute('type', 'number');
    input.setAttribute('step', '0.2');
    input.setAttribute('min', '0.2');
    input.style.cssText = `position: absolute; z-index: 9999; opacity: 0.3; width: 50px; height: 20px; top: ${top}px; left: ${left}px;`;
    input.value = video.playbackRate !== 1 ? video.playbackRate.toFixed(2) : hl_videoSpeed;
    video.playbackRate = Number(input.value);
    input.addEventListener('change', async (evt) => {
      // console.log('evt: ', evt);
      video.playbackRate = Number(evt.target.value);
      await hl_extension_util.setStorage({ hl_videoSpeed: evt.target.value });
    });
    video.parentElement.insertBefore(input, video.parentElement.firstChild);
    return input;
  }
  document.querySelectorAll('video').forEach(item => {
    const input = controlEle(item);
    input.parentElement.addEventListener('mouseenter', () => {
      input.style.display = 'block';
    });
    input.parentElement.addEventListener('mouseleave', () => {
      input.style.display = 'none';
    });
  });
}
window.addEventListener('load', () => {
  setTimeout(async () => {
    await videoSpeedController();
  }, 1000);
});

function mainFn(urlProps) {
  // console.log('执行任务 2', location.href, document.scrollingElement.scrollHeight);
  // 使用 hl_extension_data?.tabId 判断只是在 blankPage 里
  if (!window.hl_extension_data?.tabId && !urlProps.allPage) {
    return;
  }
  console.log('只在 blankpage 里');
  hl_extension_util.insertCss(urlProps.css);
  hl_extension_util.injectPageScript({
    js: urlProps.js,
    hl_extension_data: window.hl_extension_data?.tabId,
  });
}

void (async function () {
  const { hl_injectSites } = await hl_extension_util.getStorage(undefined, false);
  const injectSites = hl_injectSites ? JSON.parse(hl_injectSites) : {};
  const matchUrl = hl_extension_util.getMatchUrl(Object.keys(injectSites), decodeURIComponent(location.href));
  // console.log('matchUrl', matchUrl, location.href);
  if (matchUrl) {
    // window.addEventListener('load', mainFn);
    window.addEventListener('load', () => {
      requestIdleCallback(myNonEssentialWork, { timeout: 5000 });
      function myNonEssentialWork (deadline) {
        // console.log('执行任务 1', deadline.timeRemaining(), location.href);
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout)) {
          // console.log('执行任务 while', deadline.timeRemaining());
        }
        mainFn(injectSites[matchUrl]);
      }
    });
  }
})();
