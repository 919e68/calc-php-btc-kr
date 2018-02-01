const express = require('express')
const router = express.Router()
const Cycler = require('../lib/Cycler')

router.get('/calc', (req, res) => {
  Cycler.convert(40000000).then(data => {
    res.json(data)
  })
})

module.exports = router
