chrome.runtime.onMessage.addListener(function (
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (...args: any[]) => void
) {
  console.log(request, sender);
  console.log($);
  setInterval(sendResponse)
  //处理异步响应
  return true
})
