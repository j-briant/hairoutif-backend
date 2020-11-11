const winston = require('winston')
const path = require('path')

// Configure custom app-wide logger
module.exports = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level:'debug',
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../info.log'),
      level: 'info'
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../error.log'),
      level: 'error'
    })
  ]
})
