const { generateToken } = require('../../utils/tokens')
const mongoose = require('mongoose')

const registerCoach = async (req, res) => {
  // const { error } = validateRegisterInput(req.body)
  // if (error) return res.status(400).send({ message: error.details[0].message })
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
  user.role = 'coach'
  user.enabled = true
  user.accountType = 'local'
  const hash = generateToken()
  user.confirmationToken = hash
  user.save(async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      const Academy = mongoose.model('academy')
      const { id } = req.params
      const academy = await Academy.findById(id)
      let arrCoaches = academy.coaches
      arrCoaches.push(user._id)
      Academy.updateOne(
        { _id: id },
        {
          coaches: arrCoaches
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Creation of coach succeeded' })
          }
        }
      )
    }
  })
}

exports.registerCoach = registerCoach
