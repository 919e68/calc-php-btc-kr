const request = require('request-json')


let client = request.createClient(url)

client.get('public/ticker/BTC', (err, res, body) => {
  console.log(JSON.stringify(body, null, 2))
})
