const { generateToken } = require('../../utils/tokens')
const mongoose = require('mongoose')

const registerPlayer = async (req, res) => {
  // const { error } = validateRegisterInput(req.body)
  // if (error) return res.status(400).send({ message: error.details[0].message })
  const User = mongoose.model('User')
  let user = await User.findOne({ email: req.body.email }).exec()
  if (user) {
    return res
      .status(400)
      .json({ message: 'Email already registered. Enter an another email' })
  }
  user = new User(req.body)
  const token = user.generateAuthToken()
  user.token = token
  user.role = 'player'
  user.enabled = true
  user.accountType = 'local'
  const hash = generateToken()
  user.confirmationToken = hash
  user.save(async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      const Groupe = mongoose.model('groupe')
      const { groupeId } = req.params
      const groupe = await Groupe.findById(groupeId)
      let arrPlayers = groupe.players
      arrPlayers.push(user._id)
      Groupe.updateOne(
        { _id: groupeId },
        {
          players: arrPlayers
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res
              .status(202)
              .json({ message: 'Creation of player succeeded', player: user })
          }
        }
      )
    }
  })
}

exports.registerPlayer = registerPlayer
