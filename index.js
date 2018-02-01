const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')

const PORT = 7000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} - web app started `)
})
