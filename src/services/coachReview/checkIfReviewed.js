const mongoose = require('mongoose')
const CoachReview = mongoose.model('CoachReview')
const User = mongoose.model('User')

const checkIfReviewed = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user
    const coach = await User.findById(id)
    const review = await CoachReview.findOne({ coach: coach, player: user })
      .populate('player')
      .populate('coach')
    if (review) {
      res.status(200).send(review)
    } else {
      res.status(200).send(review)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.checkIfReviewed = checkIfReviewed
