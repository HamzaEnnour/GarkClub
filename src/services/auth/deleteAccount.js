const { validateEmail } = require('../../models/modelsValidator/userValidator')
const mongoose = require('mongoose')
const User = mongoose.model('User')

// Delete user with the email if is unverified
//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500.
const deleteAccount = (req, res) => {
  try {
    const { error } = validateEmail(req.body)
    if (error) {
      return res.status(400).send({ message: error.details[0].message })
    }

    User.findOneAndDelete(
      { email: req.body.email, isVerified: false },
      (err, user) => {
        if (err) {
          return res.status(500).send('An unexpected error occurred')
        }

        if (!user) {
          return res.status(404).send('User not found')
        }

        return res.status(200).send({ message: 'User reset success' })
      }
    )
  } catch (e) {
    return res.status(500).send('An unexpected error occurred')
  }
}

exports.deleteAccount = deleteAccount
