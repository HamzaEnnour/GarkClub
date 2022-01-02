const { validateEmail } = require('../../models/modelsValidator/userValidator')
const { sendConfirmationMail } = require('../../utils/sendMail')

const mongoose = require('mongoose')

const User = mongoose.model('User')

//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500.
const resendEmailConfirmation = (req, res) => {
  try {
    // Check for validation errors
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
          .send({ message: 'We were unable to find a user with that email.' })
      }
      if (user.enabled) {
        return res.status(400).send({
          message: 'This account has already been verified. Please log in.'
        })
      } else sendConfirmationMail(user, user.token)
      res
        .status(200)
        .send({ message: 'Email of confirmation, check your mail' })
    })
  } catch (err) {
    res.status(500).send({ message: 'An unexpected error occurred' })
  }
}

exports.resendEmailConfirmation = resendEmailConfirmation
