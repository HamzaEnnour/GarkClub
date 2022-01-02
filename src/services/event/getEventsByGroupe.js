const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const Event = mongoose.model('event')
const getEventsByGroupe = async (req, res) => {
  try {
    const { id } = req.params
    const groupe = await Groupe.findById(id)
    if (groupe) {
      const events = await Event.find({ groupe: groupe })
      res.status(200).send(events)
    } else {
      res.status(204).json({ message: 'No Groupe' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getEventsByGroupe = getEventsByGroupe
