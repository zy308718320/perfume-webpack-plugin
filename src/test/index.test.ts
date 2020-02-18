import PerfumeWebpackPlugin from '../index'
test('My PerfumeWebpackPlugin', () => {
  const perfumeWebpackPlugin = new PerfumeWebpackPlugin({
    entry: /app\.js$/,
    dataConsumption: true,
    resourceTiming: true,
    reportUrl: '',
    ignoreResource: []
  })
})
