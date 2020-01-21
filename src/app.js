const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const mssql = require('mssql')
require('dotenv').config()

const userRouter = require('./routes/user')
const fondRouter = require('./routes/fond')
const ft1Router = require('./routes/ft1')
const ft5Router = require('./routes/ft5')
const ft6Router = require('./routes/ft6')
const ft8Router = require('./routes/ft8')
const turulRouter = require('./routes/turul')

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
app.use(ft1Router)
app.use(ft5Router)
app.use(ft6Router)
app.use(ft8Router)
app.use(turulRouter)

listen()

async function listen() {
  try {
    await mssql.connect(process.env.MSSQL_URL)
    app.listen(port, () => console.log(`http://localhost:${port}`))
  } catch ({ message }) {
    console.log('MSSQL error', message)
  }
}