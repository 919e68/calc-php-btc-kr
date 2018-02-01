const request = require('request-json')

let url = 'https://quote.coins.ph/v1/'
let client = request.createClient(url)

let get = (currency) => {
  return new Promise(async (resolve, reject) => {
    try {
      client.get(`markets`, (err, res, body) => {
        if (res.statusCode == 200) {
          let data = null
          for (let i in body.markets) {
            let market = body.markets[i]
            if (market.symbol == currency) {
              data = {
                price: {
                  currency: 'PHP',
                  buy: parseFloat(market.ask),
                  sell: parseFloat(market.bid)
                }
              }
              break
            }
          }

          resolve(data)
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