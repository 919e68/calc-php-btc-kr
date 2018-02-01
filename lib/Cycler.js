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

            resolve({
              inputPHP: parseFloat(inputPHP.toFixed(2)),
              phpBTC: parseFloat(phpBTC.toFixed(8)),
              outputKRW: parseFloat(finalKRW.toFixed(2)),
              finalPHP: parseFloat(finalPHP.toFixed(2))
            })
          })
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { convert }
