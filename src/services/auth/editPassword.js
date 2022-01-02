const mongoose = require('mongoose')
// save new user with the email,passwor,firstName ...
//  Input : email,password,firstName,lastName via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 500.
const editPassword = async (req, res) => {
  const User = mongoose.model('User')
  const user = req.user
  const { password, confirmPassword, currentPassword } = req.body
  if (confirmPassword) {
    const userWithCurrentPassword = await User.findByCredentials(
      user.email,
      currentPassword
    )
    if (!userWithCurrentPassword) {
      return res.status(401).json({
        message: `Your current password is missing or incorrect; it's required to change the Password.`
      })
    }
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password mismatch' })
  }

  user.password = password
  // user.accountType = 'local'
  user.save((err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      return res
        .status(200)
        .json({ message: 'Update of user succeeded.', user: user })
    }
  })
}

exports.editPassword = editPassword
