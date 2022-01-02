const mongoose = require('mongoose')

const User = mongoose.model('User')

const updateUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const {
      firstName,
      lastName,
      age,
      height,
      weight,
      position,
      rightFooted,
      shirtNumber,
      Team
    } = req.body
    user.firstName = firstName
    user.lastName = lastName
    user.age = age
    user.height = height
    user.weight = weight
    user.position = position
    user.rightFooted = rightFooted
    user.shirtNumber = shirtNumber
    user.Team = Team
    user.save((err) => {
      if (err) {
        return res.status(500).send({ message: 'An unexpected error occurred' })
      }
      return res.status(200).send({ message: 'updates Done.' })
    })
  } catch (e) {
    return res.status(500).send({ message: 'An unexpected error occurred' })
  }
}

exports.updateUserInfo = updateUserInfo
