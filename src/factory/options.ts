export default function optionsFactory(options: any) {
  let optionsText = ''
  Object.keys(options).forEach((key) => {
    if(key !== 'analyticsTracker') {
      optionsText += `${key}: ${JSON.stringify(options[key])},\n`
    } else if(key === 'analyticsTracker' && options[key] !== null && typeof options[key] === 'function') {
      optionsText += `${key}: ${options[key].toString()},\n`
    } else {
      optionsText += `analyticsTracker: function(option) {
        var metricName = option.metricName
        var data = option.data
        var duration = option.duration
        switch (metricName) {
          case 'navigationTiming':
            if (data && data.timeToFirstByte) {
              track(metricName, data)
            }
            break
          case 'networkInformation':
            if (data && data.effectiveType) {
              track(metricName, data)
            }
            break
          case 'resourceTiming':
            track(metricName, data)
            break
          case 'cumulativeLayoutShift':
            track(metricName, data)
            break
          case 'firstPaint':
          case 'firstContentfulPaint':
          case 'firstInputDelay':
          case 'largestContentfulPaint':
            track(metricName, {duration})
            break
          default:
            break
          }
        },\n`
    }
  })
  return `
    var options = {
      ${optionsText}
    }`
}
