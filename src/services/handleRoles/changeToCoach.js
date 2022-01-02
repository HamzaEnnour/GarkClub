const mongoose = require('mongoose')
const User = mongoose.model('User')

const changeToCoach = async (req, res) => {
  const { id } = req.params
  let user = await User.findById(id)
  if (user) {
    User.updateOne(
      { _id: id },
      {
        role: 'coach'
      },
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        } else {
          res.status(202).json({ message: 'Edit of User Role succeeded.' })
        }
      }
    )
  } else {
    return res.status(400).json({ message: 'User Not Found' })
  }
}

exports.changeToCoach = changeToCoach
