export interface content_scripts {
  matches: string[]
  css?: string[] | []
  js?: string[] | []
  run_at: 'document_idle' | 'document_start' | 'document_end'
}
// document_idle	string	Preferred. Use "document_idle" whenever possible.
// The browser chooses a time to inject scripts between "document_end" and immediately after the windowonload event fires. The exact moment of injection depends on how complex the document is and how long it is taking to load, and is optimized for page load speed.
// Content scripts running at "document_idle" do not need to listen for the window.onload event, they are guaranteed to run after the DOM is complete. If a script definitely needs to run after window.onload, the extension can check if onload has already fired by using the document.readyState property.
// document_start	string	Scripts are injected after any files from css, but before any other DOM is constructed or any other script is run.
// document_end	string	Scripts are injected immediately after the DOM is complete, but before subresources like images and frames have loaded.

export type permissions =
  | 'activeTab'
  | 'alarms'
  | 'background'
  | 'bookmarks'
  | 'browsingData'
  | 'certificateProvider'
  | 'clipboardRead'
  | 'clipboardWrite'
  | 'contentSettings'
  | 'contextMenus'
  | 'cookies'
  | 'debugger'
  | 'declarativeContent'
  | 'declarativeNetRequest'
  | 'declarativeNetRequestFeedback'
  | 'declarativeWebRequest'
  | 'desktopCapture'
  | 'displaySource'
  | 'dns'
  | 'documentScan'
  | 'downloads'
  | 'enterprise.deviceAttributes'
  | 'enterprise.hardwarePlatform'
  | 'enterprise.platformKeys'
  | 'experimental'
  | 'fileBrowserHandler'
  | 'fileSystemProvider'
  | 'fontSettings'
  | 'gcm'
  | 'geolocation'
  | 'history'
  | 'identity'
  | 'idle'
  | 'idltest'
  | 'login'
  | 'loginScreenStorage'
  | 'loginState'
  | 'management'
  | 'nativeMessaging'
  | 'notifications'
  | 'pageCapture'
  | 'platformKeys'
  | 'printerProvider'
  | 'printing'
  | 'printingMetrics'
  | 'privacy'
  | 'processes'
  | 'proxy'
  | 'scripting'
  | 'search'
  | 'scripting'
  | 'sessions'
  | 'signedInDevices'
  | 'storage'
  | 'system.cpu'
  | 'system.display'
  | 'system.memory'
  | 'system.storage'
  | 'system.storage'
  | 'tabCapture'
  | 'tabGroups'
  | 'tabs'
  | 'topSites'
  | 'tts'
  | 'ttsEngine'
  | 'unlimitedStorage'
  | 'vpnProvider'
  | 'wallpaper'
  | 'webNavigation'
  | 'webRequest'
  | 'webRequestBlocking'

// activeTab	请求根据activeTab规范授予扩展名权限。
// alarms	扩展程序访问chrome.alarms API。
// background	具有后台权限，可以在后台运行，直到退出chrome；通常，“背景”权限与背景页面，事件页面或背景窗口一起使用。
// bookmarks	扩展程序访问chrome.bookmarks API的权限。
// browsingData	扩展程序可以访问chrome.browsingData API。
// certificateProvider	扩展程序授予chrome.certificateProvider API的访问权限。
// clipboardRead	如果扩展程序或应用程序使用，则为必填document.execCommand(‘paste’)。
// clipboardWrite	表示扩展程序或应用程序使用document.execCommand(‘copy’)或document.execCommand(‘cut’)。
// contentSettings	扩展程序访问chrome.contentSettings API。
// contextMenus	扩展程序访问chrome.contextMenus API。
// cookies	扩展程序访问chrome.cookies API。
// debugger	扩展程序访问chrome.debugger API。
// declarativeContent	扩展程序访问chrome.declarativeContent API的权限。
// declarativeNetRequest	扩展程序访问chrome.declarativeNetRequest API的权限。
// declarativeNetRequestFeedback	授予扩展程序对chrome.declarativeNetRequest API中的事件和方法的访问权限。
// declarativeWebRequest	扩展程序对chrome.declarativeWebRequest API的访问权限。
// desktopCapture	扩展程序可以访问chrome.desktopCapture API。
// displaySource	扩展程序授予chrome.displaySource API的访问权限。
// dns	扩展程序访问chrome.dns API。
// documentScan	扩展程序访问chrome.documentScan API的权限。
// downloads	扩展程序访问chrome.downloads API。
// enterprise.deviceAttributes	扩展程序访问chrome.enterprise.deviceAttributes API。
// enterprise.hardwarePlatform	扩展程序访问chrome.enterprise.hardwarePlatform API。
// enterprise.networkingAttributes	扩展程序访问chrome.enterprise.networkingAttributes API。
// enterprise.platformKeys	扩展程序访问chrome.enterprise.platformKeys API。
// experimental	扩展程序或应用程序使用任何chrome.experimental.* API，则为必填项。
// fileBrowserHandler	扩展程序授予chrome.fileBrowserHandler API的访问权限。
// fileSystemProvider	扩展程序访问chrome.fileSystemProvider API的权限。
// fontSettings	扩展程序访问chrome.fontSettings API。
// gcm	扩展程序访问chrome.gcm API。
// geolocation	扩展程序或应用程序使用建议的HTML5地理位置API，而无需提示用户进行许可。
// history	扩展程序访问chrome.history API。
// identity	扩展程序访问chrome.identity API。
// idle	扩展程序可以访问chrome.idle API。
// idltest	扩展程序可以访问chrome.idltest API。
// login	扩展程序可以访问chrome.login API。
// loginScreenStorage	扩展程序访问chrome.loginScreenStorage API的权限。
// loginState	扩展程序对chrome.loginState API的访问权限。
// management	扩展程序访问chrome.management API。
// nativeMessaging	扩展程序可以访问本机消息传递API。
// notifications	扩展程序访问chrome.notifications API。
// pageCapture	扩展程序可以访问chrome.pageCapture API。
// platformKeys	扩展程序可以访问chrome.platformKeys API。
// power	扩展程序访问chrome.power API。
// printerProvider	扩展程序访问chrome.printerProvider API的权限。
// printing	扩展程序访问chrome.printing API。
// printingMetrics	扩展程序可以访问chrome.printingMetrics API。
// privacy	扩展程序访问chrome.privacy API。
// processes	扩展程序可以访问chrome.processes API。
// proxy	扩展程序可以访问chrome.proxy API。
// scripting	扩展程序可以访问chrome.scripting API。
// search	扩展程序可以访问chrome.search API。
// sessions	扩展程序访问chrome.sessions API。
// signedInDevices	扩展程序可以访问chrome.signedInDevices API。
// storage	扩展程序可以访问chrome.storage API。
// system.cpu	扩展程序访问chrome.system.cpu API。
// system.display	扩展程序访问chrome.system.display API。
// system.memory	扩展程序访问chrome.system.memory API。
// system.storage	扩展程序访问chrome.system.storage API。
// tabCapture	扩展程序访问chrome.tabCapture API。
// tabGroups	扩展程序访问chrome.tabGroups API的权限。
// tabs	扩展程序可以访问Tab包括chrome.tabs和chrome.windows在内的多个API使用的对象的特权字段。在许多情况下，您的扩展程序无需声明"tabs"使用这些API的权限。
// topSites	扩展程序访问chrome.topSites API。
// tts	扩展程序可以访问chrome.tts API。
// ttsEngine	扩展程序访问chrome.ttsEngine API的权限。
// unlimitedStorage	提供无限的配额来存储HTML5客户端数据，例如数据库和本地存储文件。没有此许可，扩展程序或应用程序仅限于5 MB本地存储。
// vpnProvider	扩展程序访问chrome.vpnProvider API的权限。
// wallpaper	扩展程序访问chrome.wallpaper API。
// webNavigation	扩展程序访问chrome.webNavigation API的权限。
// webRequest	扩展程序可以访问chrome.webRequest API
// webRequestBlocking	扩展程序以阻止方式使用chrome.webRequest API，则为必填。
