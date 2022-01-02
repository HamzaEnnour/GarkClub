const mongoose = require('mongoose')
const Event = mongoose.model('event')
const editEvent = async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (event) {
      Event.updateOne(
        { _id: id },
        {
          name: req.body.name,
          type: req.body.type,
          groupe: req.body.groupe,
          startTime: req.body.startTime,
          endTime: req.body.endTime
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Edit of Event succeeded.' })
          }
        }
      )
    } else {
      res.status(404).json({ message: 'No Event' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.editEvent = editEvent
