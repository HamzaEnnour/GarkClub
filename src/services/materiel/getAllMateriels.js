const mongoose = require('mongoose')
const Materiel = mongoose.model('materiel')

const getAllMateriels = async (req, res) => {
  try {
    const materiels = Materiel.find({})
    res.status(200).send(materiels)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllMateriels = getAllMateriels
