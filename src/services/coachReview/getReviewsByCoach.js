const mongoose = require('mongoose')
const CoachReview = mongoose.model('CoachReview')

const getReviewsByCoach = async (req, res) => {
  try {
    const user = req.user
    const reviews = await CoachReview.find({ coach: user })
      .populate('player')
      .populate('coach')

    res.status(200).send(reviews)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getReviewsByCoach = getReviewsByCoach
