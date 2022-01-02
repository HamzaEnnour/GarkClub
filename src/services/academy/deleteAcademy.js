const mongoose = require('mongoose')
const Academy = mongoose.model('academy')
const deleteAcademy = async (req, res) => {
  try {
    const academy = await Academy.find({
      owner: req.user,
      _id: req.params.id
    })
    if (academy) {
      Academy.deleteOne({ owner: req.user, _id: req.params.id }, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        } else {
          res.status(200).send({ message: 'Academy deleted.' })
        }
      })
    } else {
      res.status(204).json({ message: 'User has no academies.' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteAcademy = deleteAcademy
