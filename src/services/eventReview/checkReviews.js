const mongoose = require('mongoose')

const Event = mongoose.model('event')
const Groupe = mongoose.model('groupe')
const EventReview = mongoose.model('eventReview')
const checkReviews = async (req, res) => {
  const { event: eventId } = req.params
  const event = await Event.findById(eventId).populate('groupe')
  if (event) {
    let players = []
    const groupe = await Groupe.findById(event.groupe._id).populate('players')
    if (groupe.players) {
      await Promise.all(
        groupe.players.map(async (player) => {
          const review = await EventReview.findOne({
            player: player._id,
            seance: event._id
          })
          if (review) {
            players.push({ player: player, reviewed: true })
          } else {
            players.push({ player: player, reviewed: false })
          }
        })
      )
    }
    res.status(200).json(players)
  } else {
    return res.status(500).send({ message: 'No  Event with this credentials' })
  }
}

exports.checkReviews = checkReviews
