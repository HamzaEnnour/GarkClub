const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')

function arrayContainsObject(array, object, key) {
  for (let i = 0; i < array.length; i++) {
    if (String(object[key]) == String(array[i][key])) {
      return true
    }
  }
  return false
}

const addplayersToGroup = async (req, res) => {
  try {
    const { id } = req.params
    const { players } = req.body
    const groupe = await Groupe.findById(id).populate('players')
    if (groupe) {
      let arrPlayers = groupe.players
      if (!arrPlayers) {
        arrPlayers = new Array()
      }
      let arrPlayersToAdd = new Array()
      players.forEach((player) => {
        if (!arrayContainsObject(arrPlayers, player, '_id')) {
          arrPlayersToAdd.push(player)
        }
      })
      const finalArrayOfPlayers = arrPlayers.concat(arrPlayersToAdd)
      Groupe.updateOne(
        { _id: id },
        {
          players: finalArrayOfPlayers
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Add players To Group succeeded.' })
          }
        }
      )
    } else {
      res.status(404).json({ message: 'No Groupe' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.addplayersToGroup = addplayersToGroup
