import { RequestOpt } from '@/utils/net'

export type messageContext = {
  //通信来源
  origin: 'background' | 'content' | 'devTools' | 'option' | 'popup'
  //执行方法
  executionFun?: string
  //数据
  data: any
}

export type netReq = {
  url: string
  param: RequestOpt
}
