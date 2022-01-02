const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const getGroupesByCoachId = async (req, res) => {
  try {
    const { id } = req.params
    const groupes = await Groupe.find({ coach: id })
    if (groupes) {
      res.status(200).send(groupes)
    } else {
      res.status(204).json({ message: 'No Coach' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getGroupesByCoachId = getGroupesByCoachId
