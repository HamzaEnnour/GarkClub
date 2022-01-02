const mongoose = require('mongoose')
const User = mongoose.model('User')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllUsers = getAllUsers
