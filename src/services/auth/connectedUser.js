const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const connectedUser = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const User = mongoose.model('User')
    const user = await User.findOne({
      email: data.user.email,
      'tokens.token': token
    })
    res.status(200).send({ message: 'User info successfully retreived', user })
  } catch (e) {
    res.status(401).send({ message: 'User not Logged In' })
  }
}

exports.connectedUser = connectedUser
