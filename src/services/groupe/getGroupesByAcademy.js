const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const Academy = mongoose.model('academy')
const getGroupesByAcademy = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id)
    if (academy) {
      const groupes = await Groupe.find({ academy: academy }).populate('coach')
      res.status(200).send(groupes)
    } else {
      res.status(204).json({ message: 'No Academy' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getGroupesByAcademy = getGroupesByAcademy
