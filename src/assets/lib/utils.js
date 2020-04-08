export function transformParamToUrl(param) {
  const tempObj = []

  for (const i in param) {
    if (param.hasOwnProperty(i) && param[i]) {
      tempObj.push(i)
      tempObj.push('=')
      tempObj.push(param[i])
      tempObj.push('&')
    }
  }

  tempObj.pop()
  return tempObj.join('')
}

export function sendBeacon (url, data, callback) {
  const contentType = 'text/plain;charset=UTF-8'
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(data)], {type : contentType})
    navigator.sendBeacon(url, blob)
    typeof callback === 'function' && callback()
  } else {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (+xhr.readyState === 4) {
        typeof callback === 'function' && callback()
      }
    }
    xhr.open('POST', url, false)
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.send(JSON.stringify(data))
  }
}
