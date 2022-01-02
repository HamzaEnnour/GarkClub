const mongoose = require('mongoose')

const groupeSchema = mongoose.Schema({
  name: {
    type: String
  },
  color: {
    type: String
  },
  academy: {
    type: mongoose.Types.ObjectId,
    ref: 'academy'
  },
  coach: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  players: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const Groupe = mongoose.model('groupe', groupeSchema)

module.exports = Groupe
