const mongoose = require('mongoose')
const User = mongoose.model('User')

const getNotificationToken = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  res.json({ token: user.notificationToken })
}

exports.getNotificationToken = getNotificationToken
