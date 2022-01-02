const mongoose = require('mongoose')
const Academy = mongoose.model('academy')
const Groupe = mongoose.model('groupe')
const Event = mongoose.model('event')
const {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek
} = require('../../utils/generateDates')
const { calculateReview } = require('../../utils/calculateReview')
const statByAcademy = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id)
    const groupes = await Groupe.find({ academy: academy._id }).populate(
      'players'
    )

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
    let players = new Array()
    groupes.forEach((groupe) => {
      if (groupe.players) {
        players = players.concat(groupe.players)
      }
    })
    const distinctPlayers = players.filter(
      (a, i) => players.findIndex((s) => a._id === s._id) === i
    )
    let reviews = []
    await Promise.all(
      distinctPlayers.map(async (player) => {
        const playerREview = await calculateReview(player._id)
        reviews.push({ player: player, review: playerREview })
      })
    )
    reviews.sort((a, b) => b.review.mean - a.review.mean)
    let data = {
      coaches: academy.coaches.length,
      players: players.length,
      groupes: groupes.length,
      seances: {
        today: todayEvents.length,
        thisWeek: thisWeekEvents.length,
        thisMonth: thisMonthEvents.length
      },
      bestPlayers: reviews.slice(0, 5)
    }
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.statByAcademy = statByAcademy
