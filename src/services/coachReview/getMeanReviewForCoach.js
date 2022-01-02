const mongoose = require('mongoose')
const CoachReview = mongoose.model('CoachReview')
const User = mongoose.model('User')

const getMeanReviewForCoach = async (req, res) => {
  try {
    const { id } = req.params
    const coach = await User.findById(id)

    const reviews = await CoachReview.find({ coach: coach })
      .populate('player')
      .populate('coach')
    let r = []
    reviews.map((coachReview) => {
      r.push(coachReview.note)
    })
    const reducer = (accumulator, curr) => accumulator + curr
    if (reviews && reviews.length > 0) {
      const sumReviews = r.reduce(reducer)
      const mean = sumReviews / reviews.length
      res.status(200).send({ mean: mean })
    } else {
      res.status(200).send({ mean: 0 })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getMeanReviewForCoach = getMeanReviewForCoach
