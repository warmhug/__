// 点击扩展图标 触发以下事件
// https://developer.chrome.com/docs/extensions/reference/api/action?hl=zh-cn
// chrome.action.onClicked.addListener(async (tab) => {
//   await chrome.tabs.create({ url: 'chrome://settings/system' });
//   console.log(chrome.action.openPopup, 'aaaa'); // undefined
// });

// https://developer.chrome.com/docs/extensions/reference/api/sidePanel?hl=zh-cn
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
