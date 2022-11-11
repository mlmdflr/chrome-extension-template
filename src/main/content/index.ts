console.log($('body'));

chrome.runtime.sendMessage(
    { origin: 'content' },
    {},
    (response: any) => {}
)
