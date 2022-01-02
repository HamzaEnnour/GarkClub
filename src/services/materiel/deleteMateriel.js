const mongoose = require('mongoose')
const Materiel = mongoose.model('materiel')
const deleteMateriel = async (req, res) => {
  try {
    const { id } = req.params
    const materiel = await Materiel.findById(id)
    if (materiel) {
      Materiel.deleteOne({ _id: id }, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        } else {
          res.status(200).send({ message: 'materiel deleted.' })
        }
      })
    } else {
      res.status(204).json({ message: 'No Materiel' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteMateriel = deleteMateriel
