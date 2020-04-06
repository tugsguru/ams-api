const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const mssql = require('mssql')
const expressWinston = require('express-winston')
require('dotenv').config()

const winstonInstance = require('./middlewares/logger')
const userRouter = require('./routes/user')
const fondRouter = require('./routes/fond')
const opisRouter = require('./routes/opis')
const deloRouter = require('./routes/delo')
const zarligRouter = require('./routes/zarlig')
const ft1Router = require('./routes/ft1')
const ft5Router = require('./routes/ft5')
const ft6Router = require('./routes/ft6')
const ft8Router = require('./routes/ft8')
const turulRouter = require('./routes/turul')
const uurchlultRouter = require('./routes/uurchlult')
const hnzeregRouter = require('./routes/hnzereg')
const nuutsbaidalRouter = require('./routes/nuutsbaidal')
const lt2Router = require('./routes/lt2')
const doct3Router = require('./routes/doct3')
const fileRouter = require('./routes/file')

const app = express()
const port = process.env.PORT

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(expressWinston.logger({
  winstonInstance
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./middlewares/passport')

app.use(userRouter)
app.use(fondRouter)
app.use(opisRouter)
app.use(deloRouter)
app.use(zarligRouter)
app.use(ft1Router)
app.use(ft5Router)
app.use(ft6Router)
app.use(ft8Router)
app.use(turulRouter)
app.use(uurchlultRouter)
app.use(hnzeregRouter)
app.use(nuutsbaidalRouter)
app.use(lt2Router)
app.use(doct3Router)
app.use(fileRouter)

listen()

async function listen() {
  try {
    await mssql.connect(process.env.MSSQL_URL)
    app.listen(port, () => console.log(`http://localhost:${port}`))
  } catch ({ message }) {
    console.log('MSSQL error', message)
  }
}