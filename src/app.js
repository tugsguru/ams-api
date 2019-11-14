const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const mssql = require('mssql')
const dotenv = require('dotenv').config()

const userRouter = require('./routes/user')
const fondRouter = require('./routes/fond')

const app = express()
const port = process.env.PORT

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./middlewares/passport')

app.use(userRouter)
app.use(fondRouter)

listen()

async function listen() {
  try {
    await mssql.connect(process.env.MSSQL_URL)
    app.listen(port, () => console.log(`http://localhost:${port}`))
  } catch ({ message }) {
    console.log('MSSQL error', message)
  }
}