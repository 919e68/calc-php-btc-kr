const Converter = require('./Converter')
const CoinsPH = require('./CoinsPH')
const Bithumb = require('./Bithumb')

let convertCoinsPHToBithumb = (inputPHP) => {
  return new Promise((resolve, reject) => {
    try {
      CoinsPH.get('BTC-PHP').then(php => {
        let phpBTC = parseFloat((inputPHP/php.price.buy).toFixed(8))

        Bithumb.get('BTC').then(krw => {
          krw = parseFloat(krw.price.sell)
          let finalKRW = krw * phpBTC

          Converter.convert(finalKRW, 'KRW', 'PHP').then(finalPHP => {

            let incomePHP = finalPHP - inputPHP
            let result = {
              inputPHP: parseFloat(inputPHP.toFixed(2)),
              inputBTC: parseFloat(phpBTC.toFixed(8)),
              outputKRW: parseFloat(finalKRW.toFixed(2)),
              outputPHP: parseFloat(finalPHP.toFixed(2)),
              incomePHP: parseFloat(incomePHP.toFixed(2))
            }

            resolve(result)
          })
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

let convertBithumbToCoinsPH = (inputPHP) => {
  return new Promise((resolve, reject) => {
    try {
      Converter.convert(1, 'PHP', 'KRW').then(exchangeRate => {
        let KRWfromPHP = inputPHP * exchangeRate

        Bithumb.get('BTC').then(krw => {
          let krwBTC = KRWfromPHP/krw.price.buy

          CoinsPH.get('BTC-PHP').then(php => {
            let outputPHP = php.price.sell
            let incomePHP = outputPHP - inputPHP

            let result = {
              inputPHP: parseFloat(inputPHP.toFixed(2)),
              inputKRW: parseFloat((inputPHP * exchangeRate).toFixed(2)),
              amountBTC: parseFloat(krwBTC.toFixed(8)),
              outputPHP: parseFloat(outputPHP.toFixed(2)),
              outputKRW: parseFloat((outputPHP * exchangeRate).toFixed(2)),
              incomePHP: parseFloat(incomePHP.toFixed(2)),
              incomeKRW: parseFloat((incomePHP * exchangeRate).toFixed(2))
            }

            resolve(result)
          })
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}



module.exports = { convertCoinsPHToBithumb, convertBithumbToCoinsPH }
