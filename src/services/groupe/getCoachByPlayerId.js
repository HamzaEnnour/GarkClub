const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const getCoachByPlayerId = async (req, res) => {
  try {
    const { id } = req.params
    const groupe = await Groupe.findOne({ players: { $in: [id] } }).populate(
      'coach'
    )
    if (groupe) {
      res.status(200).send(groupe.coach)
    } else {
      res.status(204).json({ message: 'No Player' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getCoachByPlayerId = getCoachByPlayerId
