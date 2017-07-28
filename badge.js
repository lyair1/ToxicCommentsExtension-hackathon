chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.browserAction.setBadgeText({text: "" + request, tabId: sender.tab.id});
  }); 