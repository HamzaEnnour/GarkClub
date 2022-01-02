const mongoose = require('mongoose')
const User = mongoose.model('User')
const Groupe = mongoose.model('groupe')

function arrayContainsObject(array, object, key) {
  for (let i = 0; i < array.length; i++) {
    if (String(object[key]) == String(array[i][key])) {
      return true
    }
  }
  return false
}

const retirerPlayer = async (req, res) => {
  try {
    const { user: userId, groupe: groupeId } = req.params
    const user = await User.findById(userId)
    const groupe = await Groupe.findById(groupeId).populate('players')
    let arrPlayers = groupe.players
    if (arrayContainsObject(arrPlayers, user, '_id')) {
      arrPlayers.splice(
        arrPlayers.findIndex((a) => String(a._id) === String(userId)),
        1
      )
      Groupe.updateOne(
        { _id: groupeId },
        {
          players: arrPlayers
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Retire of player succeeded' })
          }
        }
      )
    } else {
      res.status(202).json({ message: 'player Already does not Exist' })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

exports.retirerPlayer = retirerPlayer
