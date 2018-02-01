const Cycler = require('./lib/Cycler')

Cycler.convert(40000000).then(finalPHP => {
  console.log(parseFloat(finalPHP.toFixed(2)))
})
