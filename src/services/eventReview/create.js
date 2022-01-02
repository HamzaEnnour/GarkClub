const mongoose = require('mongoose')

const User = mongoose.model('User')
const Event = mongoose.model('event')
const EventReview = mongoose.model('eventReview')

const create = async (req, res) => {
  const { event: eventId, player: playerId } = req.params
  const player = await User.findById(playerId)
  const event = await Event.findById(eventId)
  if (player && event) {
    const eventReview = new EventReview(req.body)
    eventReview.player = player
    eventReview.seance = event
    eventReview.save((err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      } else {
        return res.status(200).json(result)
      }
    })
  } else {
    return res
      .status(500)
      .send({ message: 'No Groupe or Event with this credentials' })
  }
}

exports.create = create
