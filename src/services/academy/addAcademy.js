const mongoose = require('mongoose')

const Academy = mongoose.model('academy')
const User = mongoose.model('User')
const addAcademy = async (req, res) => {
  const academy = new Academy(req.body)
  await User.updateOne(
    { _id: req.user.id },
    {
      role: 'owner'
    }
  )
  academy.owner = req.user
  academy.save((err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      return res.status(200).json({ message: 'Creation of academy succeeded.' })
    }
  })
}

exports.addAcademy = addAcademy
