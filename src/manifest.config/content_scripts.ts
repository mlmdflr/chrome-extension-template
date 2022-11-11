import { content_scripts } from '@/types/manifest'

/**
 * 注入配置
 */
export default [
  {
    matches: ['https://www.v2ex.com/*'],
    js: ['index.js'],
    run_at: 'document_end',
  },
] as content_scripts[]
