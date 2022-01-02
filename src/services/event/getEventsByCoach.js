const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const Event = mongoose.model('event')
const User = mongoose.model('User')
const getEventsByCoach = async (req, res) => {
  try {
    const { id } = req.params
    const coach = await User.findById(id)
    if (coach) {
      const groupes = await Groupe.find({ coach: coach })
      const events = await Event.find({ groupe: { $in: groupes } })
      res.status(200).send(events)
    } else {
      res.status(204).json({ message: 'No Coach' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getEventsByCoach = getEventsByCoach
