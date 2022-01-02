const winston = require('winston')
// To Log on mongoDB database use :
// require("winston-mongodb");
require('express-async-errors')

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  )

  process.on('unhandledRejection', (ex) => {
    throw ex
  })
  // Local file
  winston.add(new winston.transports.File({ filename: 'logfile.log' }))
}
