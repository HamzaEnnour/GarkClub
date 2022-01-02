const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const { calculateReview } = require('../../utils/calculateReview')
const Abonnement = mongoose.model('abonnement')
const { endOfMonth, startOfMonth } = require('../../utils/generateDates')

const getPlayersWithState = async (req, res) => {
  try {
    const { id } = req.params
    const groupe = await Groupe.findById(id)
      .populate('players')
      .populate('coach')
    let playerWithReview = []
    if (groupe.players) {
      await Promise.all(
        groupe.players.map(async (player) => {
          const playerReview = await calculateReview(player._id)
          playerWithReview.push({
            player: player,
            playerReview: playerReview
          })
        })
      )
    }

    let playersPayment = new Array()
    if (playerWithReview) {
      await Promise.all(
        playerWithReview.map(async (player) => {
          const abonnement = await Abonnement.findOne({
            player: player.player._id,
            StartTime: { $gte: startOfMonth, $lte: endOfMonth }
          })
          if (abonnement) {
            playersPayment.push({ player: player, payed: true })
          } else {
            playersPayment.push({ player: player, payed: false })
          }
        })
      )
    }

    res.status(200).send(playersPayment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getPlayersWithState = getPlayersWithState
