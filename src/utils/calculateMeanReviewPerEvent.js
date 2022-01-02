const mongoose = require('mongoose')
const { calculateReview } = require('./calculateReview')
const Event = mongoose.model('event')

const calculateMeanReviewPerEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId).populate('groupe')
    const groupe = event.groupe
    let reviews = []
    const reducer = (accumulator, curr) => accumulator + curr
    groupe &&
      groupe.players &&
      (await Promise.all(
        groupe.players.map(async (playerId) => {
          const playerReview = await calculateReview(playerId)
          reviews.push(playerReview.mean)
        })
      ))

    if (reviews.length > 0) {
      const sumReviews = reviews.reduce(reducer)
      return sumReviews / reviews.length
    } else {
      return 50
    }
  } catch (error) {
    throw new Error(error)
  }
}

exports.calculateMeanReviewPerEvent = calculateMeanReviewPerEvent
