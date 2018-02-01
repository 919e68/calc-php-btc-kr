const currencyConvert = require('currency-convert')

let convert = (amount, from, to) => {
  return new Promise(async (resolve, reject) => {
    try {
      currencyConvert(amount, from, to).then(data => {
        resolve(data)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { convert }