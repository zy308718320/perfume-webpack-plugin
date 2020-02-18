import Perfume from 'perfume.js'
import { transformParamToUrl } from '../lib/utils'
import { pick } from 'lodash'

const options = {
  // 通过webpack注入选项
}

function report(url: string, type: string, data: object) {
  const param = {
    type,
    data: encodeURI(JSON.stringify(data))
  }
  const beacon = new Image()
  beacon.src = `${url}${url.includes('?') ? '&' : '?'}${transformParamToUrl(param)}`
}

function track(type: string, data: any) {
  // @ts-ignore
  const { ignoreResource } = options
  let isIgnore = false
  if (type === 'resourceTiming') {
    isIgnore = ignoreResource.some((rule: any) => (
      data[rule.key] && data[rule.key].includes(rule.value)
    ))
  }
  // @ts-ignore
  if (!isIgnore && options.reportUrl) {
    // @ts-ignore
    report(options.reportUrl, type, data)
  }
}

const perfumeOptions = pick(options, [
  'dataConsumption',
  'resourceTiming',
  'analyticsTracker',
  'logPrefix',
  'logging',
  'maxMeasureTime',
])
// @ts-ignore
window.perfume = new Perfume(perfumeOptions)
// const perfumeWorker = new Worker('./perfume-worker.js')

