const winston = require('winston')

module.exports = (err, req, res) => {
  winston.error(err.message, err)

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send('Something failed.')
}
