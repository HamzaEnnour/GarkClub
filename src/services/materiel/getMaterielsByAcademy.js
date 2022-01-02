const mongoose = require('mongoose')
const Materiel = mongoose.model('materiel')
const Academy = mongoose.model('academy')
const getMaterielsByAcademy = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id)
    if (academy) {
      const groupes = await Materiel.find({ academy: academy })
      res.status(200).send(groupes)
    } else {
      res.status(204).json({ message: 'No Academy' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getMaterielsByAcademy = getMaterielsByAcademy
