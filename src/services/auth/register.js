const {
  validateRegisterInput
} = require('../../models/modelsValidator/userValidator')
const { sendConfirmationMail } = require('../../utils/sendMail')
const { generateToken } = require('../../utils/tokens')
const mongoose = require('mongoose')

// save new user with the email,passwor,firstName ...
//  Input : email,password,firstName,lastName via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 500.
const register = async (req, res) => {
  // try {
  const { error } = validateRegisterInput(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })
  // Check for existing email
  const User = mongoose.model('User')
  let user = await User.findOne({ email: req.body.email }).exec()
  if (user) {
    return res
      .status(400)
      .json({ message: 'Email already registered. Enter an another email' })
  }

  user = new User(req.body)
  const token = user.generateAuthToken()
  user.token = token
  user.role = 'user'
  user.accountType = 'local'
  const hash = generateToken()
  user.confirmationToken = hash
  user.save((err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      // send Mail
      const isSended = sendConfirmationMail(user, hash)
      if (isSended) {
        User.findOneAndDelete(
          { email: user.email, isVerified: false },
          (err) => {
            if (err) {
              return res
                .status(500)
                .send(
                  'Impossible to delete the created user. Contact support or wait 12 hours to retry.'
                )
            }
          }
        )
        return res.status(503).send({
          message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`
        })
      } else {
        return res.status(200).json({
          message: 'Creation of user succeeded, confirm by mail.',
          user: user
        })
      }
    }
  })
}

exports.register = register
