const {
  validateLoginInput
} = require('../../models/modelsValidator/userValidator')

const mongoose = require('mongoose')

const User = mongoose.model('User')

const login = async (req, res) => {
  try {
    const { error } = validateLoginInput(req.body)
    if (error) {
      return res.status(400).send({ message: error.details[0].message })
    }
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Login failed! Check authentication credentials' })
    }
    if (user.enabled) {
      const token = await user.generateAuthToken()
      user.tokens = user.tokens.concat({ token })
      await user.save()
      res.status(200).json({ user, token })
    } else {
      res.status(403).send({ message: 'Please confirm your registration' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = login
