const mongoose = require('mongoose')
const { endOfDay } = require('../../utils/generateDates')
const Academy = mongoose.model('academy')
const Groupe = mongoose.model('groupe')
const Abonnement = mongoose.model('abonnement')

const checkPayment = async (req, res) => {
  const { academy: academyId } = req.params
  const academy = await Academy.findById(academyId)
  if (academy) {
    const groupes = await Groupe.find({ academy: academy._id }).populate(
      'players'
    )
    let players = new Array()
    groupes.forEach((groupe) => {
      if (groupe.players) {
        players = players.concat(groupe.players)
      }
    })
    const distinctPlayers = players.filter(
      (a, i) => players.findIndex((s) => a._id === s._id) === i
    )
    let playersPayment = new Array()
    if (distinctPlayers) {
      await Promise.all(
        distinctPlayers.map(async (player) => {
          const abonnement = await Abonnement.findOne({
            player: player._id,
            EndTime: { $gte: endOfDay }
          })
          if (abonnement) {
            playersPayment.push({
              player: player,
              payed: true,
              expire: abonnement.EndTime
            })
          } else {
            playersPayment.push({ player: player, payed: false })
          }
        })
      )
    }
    res.status(200).json(playersPayment)
  } else {
    return res.status(500).send({ message: 'No Academy with this credentials' })
  }
}

exports.checkPayment = checkPayment
