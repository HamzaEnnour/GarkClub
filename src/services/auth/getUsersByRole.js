const mongoose = require('mongoose')
const User = mongoose.model('User')

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params
    const users = await User.find({ role: role })
    res.status(200).send(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getUsersByRole = getUsersByRole
