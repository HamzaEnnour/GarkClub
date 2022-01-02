const moment = require('moment')
const {
  validatePassword
} = require('../../models/modelsValidator/userValidator')
const mongoose = require('mongoose')
moment().format()
const User = mongoose.model('User')

//  Input : reset token via params, new password via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
const resetPassword = (req, res) => {
  // Validate password Input
  // TODO : add verification matching new password
  const { error } = validatePassword(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })
  // Find a matching token
  User.findOne({ confirmationToken: req.params.token }, (err, user) => {
    if (err) {
      return res.status(500).send('An unexpected error occurred')
    }
    if (!user) {
      return res.status(404).send({
        message: 'This token is not valid. Your token may have expired.'
      })
    }
    // Verify that the user token expires date has not been passed
    if (moment().utcOffset(0) > user.passwordResetExpires) {
      return res.status(400).send({
        message:
          'You cannot reset your password. The reset token has expired. Please go through the reset form again.'
      })
    }
    // Update user
    user.password = req.body.password
    user.passwordResetExpires = null
    // Save updated user to the database
    user.save((err) => {
      if (err) {
        return res.status(500).send({ message: 'An unexpected error occurred' })
      }
      return res
        .status(200)
        .send({ message: 'Password has been successfully changed.' })
      // Send mail confirming password change to the user ?
    })
  })
}

exports.resetPassword = resetPassword
