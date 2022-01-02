const mongoose = require('mongoose')
const Academy = mongoose.model('academy')

const updateImage = async (req, res) => {
  try {
    const academy = await Academy.findOne({
      owner: req.user,
      _id: req.params.id
    })
    if (academy) {
      Academy.updateOne(
        { owner: req.user, _id: req.params.id },
        {
          image: req.body.image
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Edit of academy succeeded.' })
          }
        }
      )
    } else {
      res.status(404).json({ message: 'User has no academies.' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateImage = updateImage
