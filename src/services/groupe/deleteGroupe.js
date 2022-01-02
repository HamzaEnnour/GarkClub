const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const deleteGroupe = async (req, res) => {
  try {
    const { id } = req.params
    const groupe = await Groupe.findById(id)
    if (groupe) {
      Groupe.deleteOne({ _id: id }, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        } else {
          res.status(200).send({ message: 'groupe deleted.' })
        }
      })
    } else {
      res.status(204).json({ message: 'No Groupe' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteGroupe = deleteGroupe
