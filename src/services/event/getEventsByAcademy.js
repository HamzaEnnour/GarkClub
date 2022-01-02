const mongoose = require('mongoose')
const Academy = mongoose.model('academy')
const Event = mongoose.model('event')
const Groupe = mongoose.model('groupe')
const getEventsByAcademy = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id)
    if (academy) {
      const groupes = await Groupe.find({ academy: academy })
      const events = await Event.find({ groupe: { $in: groupes } })
      res.status(200).send(events)
    } else {
      res.status(204).json({ message: 'No Academy' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getEventsByAcademy = getEventsByAcademy
