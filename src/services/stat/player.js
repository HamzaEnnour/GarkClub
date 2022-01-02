const mongoose = require('mongoose')
const EventReview = mongoose.model('eventReview')
const Groupe = mongoose.model('groupe')
const Event = mongoose.model('event')
const Abonnement = mongoose.model('abonnement')

const {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek
} = require('../../utils/generateDates')
const { calculateReview } = require('../../utils/calculateReview')
const {
  calculateMeanReviewPerEvent
} = require('../../utils/calculateMeanReviewPerEvent')

const statPlayer = async (req, res) => {
  try {
    const user = req.user
    const groupes = await Groupe.find({ players: { $in: user } })
    const allEvents = await Event.find({
      groupe: { $in: groupes }
    })
    const reviews = await EventReview.find({
      player: user._id
    }).sort({ createdAt: 'desc' })
    const todayEvents = await Event.find({
      groupe: { $in: groupes },
      startTime: { $gte: startOfDay, $lte: endOfDay }
    })
    const thisWeekEvents = await Event.find({
      groupe: { $in: groupes },
      startTime: { $gte: startOfWeek, $lte: endOfWeek }
    })
    const thisMonthEvents = await Event.find({
      groupe: { $in: groupes },
      startTime: { $gte: startOfMonth, $lte: endOfMonth }
    })
    const playerReview = await calculateReview(req.user._id)
    let groupeReviews = []
    await Promise.all(
      reviews.slice(-10).map(async (review) => {
        const groupeReview = await calculateMeanReviewPerEvent(review.seance)
        groupeReviews.push(groupeReview)
      })
    )
    const abonnement = await Abonnement.findOne({
      player: user._id,
      EndTime: { $gte: endOfDay }
    })

    let data = {
      abonnement: abonnement,
      allSeances: allEvents.length,
      seancesPlayed: groupes.length,
      seances: {
        today: todayEvents.length,
        thisWeek: thisWeekEvents.length,
        thisMonth: thisMonthEvents.length
      },
      info: {
        height: req.user.height ? req.user.height : '',
        weight: req.user.weight ? req.user.weight : '',
        position: req.user.position ? req.user.position : '',
        rightFooted: req.user.rightFooted ? req.user.rightFooted : '',
        shirtNumber: req.user.shirtNumber ? req.user.shirtNumber : '',
        Team: req.user.Team ? req.user.Team : '',
        age: req.user.age ? req.user.age : ''
      },
      reviews: reviews.slice(-10),
      groupeReviews: groupeReviews,
      review: playerReview
    }
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.statPlayer = statPlayer
