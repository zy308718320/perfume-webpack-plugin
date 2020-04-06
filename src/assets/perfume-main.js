import Perfume from 'perfume.js'
import { transformParamToUrl, sendBeacon } from './lib/utils'
import { pick } from 'lodash'
import { perfumeOptionItems } from './config'
import * as Fingerprint2 from 'fingerprintjs2'

const options = {
  // 通过webpack注入选项, 下面参数只是占位
}

const fpsMap = {}
let fingerprint = ''
const sumData = {}

async function getFingerprint () {
  if (!fingerprint) {
    const components = await Fingerprint2.getPromise()
    fingerprint = Fingerprint2.x64hash128(components.join(''), 31)
  }
  return fingerprint
}

function getFPS () {
  let frame = 0
  let allFrameCount = 0
  let lastTime = performance.now()
  let lastFameTime = performance.now()

  function loop () {
    const now = performance.now()
    lastFameTime = now
    allFrameCount++
    frame++
    if (now > 1000 + lastTime) {
      let fps = Math.round((frame * 1000) / (now - lastTime))
      if (fps > 60) {
        fps = 60
      }
      const fpsObj = fpsMap[fps]
      if (!fpsObj) {
        fpsMap[fps] = 0
      }
      fpsMap[fps]++
      frame = 0
      lastTime = now
    }
    window.requestAnimationFrame(loop)
  }

  loop()
}

function bindCloseEvents () {
  function pushState () {
    window.history.pushState({
      title: document.title,
      url: location.href
    }, document.title, location.href)
  }

  function closeWindow () {
    '' === document.referrer ? navigator.userAgent.indexOf('MicroMessenger') > -1
      ? window.WeixinJSBridge.call('closeWindow') : navigator.userAgent.indexOf('QQ') > -1
        ? window.mqq.ui.closeWebViews() : window.history.back() : window.history.back()
  }

  window.onbeforeunload = reportData
  void setTimeout(() => {
    pushState()
    window.addEventListener('popstate', (e) => {
      if (!e.state) {
        reportData(closeWindow)
      }
    }, false)
  }, 100)
}

function reportData (callback) {
  if (options.isMerge) {
    sumData.fps = fpsMap
    report(options.reportUrl, 'sum', sumData, callback)
  } else {
    report(options.reportUrl, 'fps', fpsMap, callback)
  }
}

async function report (url, type, data, callback) {
  if (!url) {
    return
  }
  const param = {
    type,
    tag: options.tag,
    path: encodeURIComponent(window.location.href),
    fingerprint: await getFingerprint(),
    data: encodeURIComponent(JSON.stringify(data))
  }
  if (type === 'sum' || type === 'fps') {
    sendBeacon(url, param, callback)
  } else {
    const beacon = new Image()
    beacon.src = `${url}${url.includes('?') ? '&' : '?'}${transformParamToUrl(param)}`
  }
}

function track (type, data) {
  const { ignoreResource } = options
  let isIgnore = false
  if (type === 'resourceTiming') {
    isIgnore = ignoreResource.some((rule) => (
      data[rule.key] && data[rule.key].includes(rule.value)
    ))
    if (!isIgnore) {
      report(options.reportUrl, type, data, null)
    }
  } else {
    if (!options.isMerge) {
      report(options.reportUrl, type, data, null)
    } else {
      sumData[type] = data
    }
  }
}

const perfumeOptions = pick(options, perfumeOptionItems)
getFPS()
bindCloseEvents()
window.perfume = new Perfume(perfumeOptions)
// const perfumeWorker = new Worker('./perfume-worker.js')

