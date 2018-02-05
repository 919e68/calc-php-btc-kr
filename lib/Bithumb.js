const request = require('request-json')

let url = 'https://api.bithumb.com/'
let client = request.createClient(url)

let get = (currency) => {
  return new Promise(async (resolve, reject) => {
    try {
      client.get(`public/ticker/${currency.toUpperCase()}`, (err, res, body) => {
        if (res.statusCode == 200) {
          resolve({
            price: {
              code: 'KRW',
              buy: parseFloat(body.data.sell_price),
              sell: parseFloat(body.data.buy_price)
            }
          })
        } else {
          reject({
            error: {
              statusCode: res.statusCode,
              msg: 'request unsuccessful'
            }
          })
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { url, get }
