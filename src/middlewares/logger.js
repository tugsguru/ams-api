const resolve = require('path').resolve

const createLogger = require('winston').createLogger
const format = require('winston').format
const transports = require('winston').transports

let env = 'prod'

if (process.env.NODE_ENV !== 'production') {
  env = 'dev'
}

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({
      filename: resolve(
        `logs/${env}/error.log`
      ),
      level: 'error'
    }),
    new transports.File({
      filename: resolve(
        `logs/${env}/combined.log`
      )
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }))
}

module.exports = logger