const Cycler = require('./lib/Cycler')
const Converter = require('./lib/Converter')


Cycler.convertCoinsPHToBithumb(400000).then(data => {
  console.log('CoinsPH To Bithumb', JSON.stringify(data, null, 2))
})

Cycler.convertBithumbToCoinsPH(400000).then(data => {
  console.log('Bithumb To CoinsPH', JSON.stringify(data, null, 2))
})

Converter.convert(1, 'PHP', 'KRW').then(price => {
  console.log('1 PHP = ' + price + ' KRW')
})
