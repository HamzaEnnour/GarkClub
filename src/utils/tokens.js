const crypto = require('crypto')

const generateToken = () => {
  const hash = crypto.randomBytes(64).toString('hex')
  return hash
}

exports.generateToken = generateToken
