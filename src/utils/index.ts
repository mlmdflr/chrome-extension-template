/**
 * 对象转参数
 * @param data
 */
export function queryParams(data: any): string {
  let _result = []
  for (let key in data) {
    let value = data[key]
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach((_value) => {
        _result.push(
          encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
        )
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }
  return _result.length ? _result.join('&') : ''
}

export function random(start: number = 0, end: number = 1): number {
  return (Math.random() * (end - start + 1) + start) | 0
}
