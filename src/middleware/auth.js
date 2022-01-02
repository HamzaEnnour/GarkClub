const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1]
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({
      email: data.user.email,
      'tokens.token': token
    })
    if (!user) {
      throw new Error() // TODO: chager l'erreur en reponse http
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    // TODO: afficher error en response ?
    res.status(401).send({ error: 'Not authorized to access this resource' }) // if not valid jwt
  }
}

module.exports = auth
