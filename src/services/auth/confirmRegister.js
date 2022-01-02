const mongoose = require('mongoose')

const User = mongoose.model('User')

// Confirm user with the token send it by email
//  Input : toekn via params;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500.
const confirmRegister = (req, res) => {
  try {
    // Find a matching token
    User.findOne({ confirmationToken: req.params.token }, (err, user) => {
      if (err) {
        return res.status(500).send('An unexpected error occurred')
      }
      if (!user) {
        return res.status(404).send({
          message:
            'We were unable to find a valid token. Your token may have expired.'
        })
      }
      if (user.enabled) {
        return res.status(400).send({
          message: 'This user has already been verified. Please log in.'
        })
      }
      // Verify and save the user
      user.enabled = true
      user.save((err) => {
        if (err) {
          return res
            .status(500)
            .send({ message: 'An unexpected error occurred' })
        }
        return res
          .status(200)
          .send({ message: 'The account has been verified. Please log in.' })
      })
    })
  } catch (e) {
    return res.status(500).send({ message: 'An unexpected error occurred' })
  }
}

exports.confirmRegister = confirmRegister
