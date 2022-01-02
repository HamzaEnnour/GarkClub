const mongoose = require('mongoose')

const eventReviewSchema = mongoose.Schema(
  {
    pace: {
      type: Number,
      default: 0
    },
    defence: {
      type: Number,
      default: 0
    },
    passe: {
      type: Number,
      default: 0
    },
    drible: {
      type: Number,
      default: 0
    },
    physique: {
      type: Number,
      default: 0
    },
    shot: {
      type: Number,
      default: 0
    },
    nbOfGoals: {
      type: Number,
      default: 0
    },
    nbOfAssist: {
      type: Number,
      default: 0
    },
    played: {
      type: Boolean,
      default: false
    },
    seance: {
      type: mongoose.Types.ObjectId,
      ref: 'event'
    },
    player: {
      type: mongoose.Types.ObjectId,
      ref: 'user '
    }
  },
  {
    timestamps: true
  }
)

const EventReview = mongoose.model('eventReview', eventReviewSchema)
module.exports = EventReview
