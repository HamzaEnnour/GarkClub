const mongoose = require('mongoose')
const Event = mongoose.model('event')

const getAllEvents = async (req, res) => {
  try {
    const events = Event.find({})
    res.status(200).send(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllEvents = getAllEvents
