const moment = require('moment')
const { validateEmail } = require('../../models/modelsValidator/userValidator')
const { sendRequestResetPasswordMail } = require('../../utils/sendMail')
const { generateToken } = require('../../utils/tokens')
const mongoose = require('mongoose')
moment().format()
const User = mongoose.model('User')

//  Input : email via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
const requestResetPassword = (req, res) => {
  try {
    const { error } = validateEmail(req.body)
    if (error) {
      return res.status(400).send({ message: error.details[0].message })
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(500).send({ message: 'An unexpected error occurred' })
      }
      if (!user) {
        return res
          .status(404)
          .send({ message: 'No user found with this email address.' })
      }
      // Create a verification token
      const token = generateToken()
      user.confirmationToken = token
      user.passwordResetExpires = moment().add(12, 'hours')
      user.save((err) => {
        if (err) {
          return res
            .status(500)
            .send({ message: 'An unexpected error occurred' })
        }
        // Send the mail
        else {
          if (sendRequestResetPasswordMail(user, token)) {
            return res.status(503).send({
              message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`
            })
          } else {
            return res.status(200).send({
              message: `A validation email has been sent to ${user.email}`
            })
          }
        }
      })
    })
  } catch (e) {
    res.status(500).send({ message: 'An unexpected error occurred' })
  }
}

exports.requestResetPassword = requestResetPassword
