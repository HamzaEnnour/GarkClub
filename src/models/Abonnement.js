const mongoose = require('mongoose')

const abonnementSchema = mongoose.Schema(
  {
    academy: {
      type: mongoose.Types.ObjectId,
      ref: 'academy'
    },
    frais: {
      type: Number,
      default: 0
    },
    StartTime: {
      type: Date
    },
    EndTime: {
      type: Date
    },
    player: {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

const Abonnement = mongoose.model('abonnement', abonnementSchema)
module.exports = Abonnement
