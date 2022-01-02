const mongoose = require('mongoose')
const Event = mongoose.model('event')
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (event) {
      Event.deleteOne({ _id: id }, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        } else {
          res.status(200).send({ message: 'Event deleted.' })
        }
      })
    } else {
      res.status(204).json({ message: 'No Event' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteEvent = deleteEvent
