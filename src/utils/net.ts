/**
 * 原生请求（fetch）
 */

import { queryParams } from './'
import { Snowflake } from './snowflake'

export interface RequestOpt extends RequestInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string
  isStringify?: boolean //是否stringify参数（非GET请求使用）
  isHeaders?: boolean //是否获取 响应 headers
  data?: any //传参  此参数比body参数优先级高（一般情况二选一）
  timeout?: number //超时时间
  type?: 'TEXT' | 'JSON' | 'BUFFER' | 'BLOB' //返回数据类型
}

export interface TimeOutAbort {
  signal: AbortSignal
  id: bigint | NodeJS.Timeout
}

/**
 * 创建 AbortController
 */
export function AbortSignal() {
  return new AbortController()
}

/**
 * 超时处理
 * @param outTime
 */
function timeOutAbort(outTime: number): TimeOutAbort {
  const controller = AbortSignal()
  //后台特殊处理
  const isBackground = typeof window === 'undefined'
  let id: bigint | NodeJS.Timeout = 0n
  if (isBackground) {
    id = new Snowflake(1n, 2n).nextId()
    chrome.alarms.create(id.toLocaleString(), {
      delayInMinutes: outTime / 1000 / 60,
    })
    chrome.alarms.onAlarm.addListener((alarm: chrome.alarms.Alarm) => {
      if (alarm.name === id.toLocaleString()) {
        controller.abort()
      }
    })
  } else {
    id = setTimeout(() => {
      controller.abort()
    }, outTime)
  }
  return { signal: controller.signal, id }
}

/**
 * 响应拦截
 * @param res Response 响应对象
        interface Response extends Body {
            readonly headers: Headers;
            readonly ok: boolean;
            readonly redirected: boolean;
            readonly status: number;
            readonly statusText: string;
            readonly type: ResponseType;
            readonly url: string;
            clone(): Response;
        }
 * @returns Response
 */
function responseIntercept(res: Response): Response {
  if (res.status >= 200 && res.status < 300) return res
  throw new Error(`status: ${res.status} statusText:${res.statusText}`)
}

/**
 * 请求处理
 * @param url
 * @param sendData
 */
function fetchPromise<T>(url: string, sendData: RequestOpt): Promise<T> {
  return fetch(url, sendData)
    .then(responseIntercept) //状态码拦截
    .then(async (res) => {
      switch (sendData.type) {
        case 'TEXT':
          return sendData.isHeaders
            ? {
                headers: res.headers,
                data: await res.text(),
              }
            : await res.text()
        case 'JSON':
          return sendData.isHeaders
            ? {
                headers: res.headers,
                data: await res.json(),
              }
            : await res.json()
        case 'BUFFER':
          return sendData.isHeaders
            ? {
                headers: res.headers,
                data: await res.arrayBuffer(),
              }
            : await res.arrayBuffer()
        case 'BLOB':
          return sendData.isHeaders
            ? {
                headers: res.headers,
                data: await res.blob(),
              }
            : await res.blob()
      }
    })
}

/**
 * http请求
 * @param url
 * @param param
 */
export async function net<T>(url: string, param: RequestOpt = {}): Promise<T> {
  let abort: TimeOutAbort | null = null
  if (!param.signal) abort = timeOutAbort(param.timeout || 3000)
  let sendData: RequestOpt = {
    isHeaders: param.isHeaders,
    isStringify: param.isStringify,
    headers: new Headers(
      Object.assign(
        {
          'content-type': 'application/json;charset=utf-8', //默认头，手动设置则覆盖
        },
        param.headers
      )
    ),
    type: param.type || 'TEXT', //默认返回文本，设置json则自动解析对象
    method: param.method || 'GET', //默认get请求
    // timeout只会在未指定signal下生效
    signal: abort ? abort.signal : param.signal,
  }
  if (param.data) {
    // Get 请求默认在url上序列化，其他请求则由isStringify决定
    if (sendData.method === 'GET') url = `${url}?${queryParams(param.data)}`
    else
      sendData.body = sendData.isStringify
        ? queryParams(param.data)
        : JSON.stringify(param.data)
  }
  return fetchPromise<T>(url, sendData).then((req) => {
    const isBackground = typeof window === 'undefined'
    isBackground && abort && chrome.alarms.clear(abort.id.toLocaleString())
    !isBackground && abort && clearTimeout(abort.id as NodeJS.Timeout)
    return req
  })
}
