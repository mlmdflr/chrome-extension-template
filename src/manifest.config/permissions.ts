import { permissions } from '@/types/manifest'
/**
 * 权限配置
 */
export default [
  'declarativeNetRequest',
  'declarativeNetRequestFeedback',
  'contextMenus',
  'webRequest',
  'tabs',
  'alarms',
  'activeTab',
  'notifications',
  'storage',
  'unlimitedStorage',
  'downloads',
  'cookies',
  'management',
  'webNavigation',
] as permissions[]
