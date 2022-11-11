console.log('jq inject', $);
chrome.runtime.sendMessage(
    { origin: 'content' },
    {},
    (response: any) => {
       
    }
)
