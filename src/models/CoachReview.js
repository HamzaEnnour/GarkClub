const mongoose = require('mongoose')

const coachReviewSchema = mongoose.Schema(
  {
    note: {
      type: Number,
      default: 0
    },
    coach: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    player: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const CoachReview = mongoose.model('CoachReview', coachReviewSchema)
module.exports = CoachReview
