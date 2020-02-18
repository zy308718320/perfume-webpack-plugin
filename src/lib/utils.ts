export function transformParamToUrl(param: any) {
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
