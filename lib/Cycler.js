const Converter = require('./Converter')
const CoinsPH = require('./CoinsPH')
const Bithumb = require('./Bithumb')

let convert = (inputPHP) => {
  return new Promise(async (resolve, reject) => {
    try {
      CoinsPH.get('BTC-PHP').then(php => {
        let phpBTC = parseFloat((inputPHP/php.price.buy).toFixed(8))

        Bithumb.get('BTC').then(krw => {
          krw = parseFloat(krw.price.sell)
          let finalKRW = krw * phpBTC

          Converter.convert(finalKRW, 'KRW', 'PHP').then(finalPHP => {
            resolve(finalPHP)
          })
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { convert }
