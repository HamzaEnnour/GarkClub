const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')
const { calculateReview } = require('../../utils/calculateReview')
const getPlayers = async (req, res) => {
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

    res.status(200).send(playerWithReview)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getPlayers = getPlayers
