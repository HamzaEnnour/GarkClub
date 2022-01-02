const mongoose = require('mongoose')
const User = mongoose.model('User')

const updateNotificationToken = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const { token } = req.body
  user.notificationToken = token
  await user.save()
  res.json({ update: true, token: user.notificationToken })
}

exports.updateNotificationToken = updateNotificationToken
