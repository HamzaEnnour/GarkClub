const mongoose = require('mongoose')
const Academy = mongoose.model('academy')
const Groupe = mongoose.model('groupe')
const { endOfDay } = require('../../utils/generateDates')
const Abonnement = mongoose.model('abonnement')

const getPlayersByAcademy = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id)
    const groupes = await Groupe.find({ academy: academy._id }).populate(
      'players'
    )
    //console.log(groupes)
    let players = new Array()
    groupes.forEach((groupe) => {
      if (groupe.players) {
        let p = []
        groupe.players.forEach(function (element) {
          const e = element.toObject()
          e['groupe'] = groupe
          p.push(e)
        })
        players = players.concat(p)
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

    // res.status(200).send(distinctPlayers)
    res.status(200).send(playersPayment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getPlayersByAcademy = getPlayersByAcademy
