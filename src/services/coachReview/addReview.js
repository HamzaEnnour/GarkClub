const mongoose = require('mongoose')
const CoachReview = mongoose.model('CoachReview')

const addReview = async (req, res) => {
  const coachReview = new CoachReview(req.body)
  coachReview.note = req.body.review.note
  coachReview.coach = req.body.review.coach
  coachReview.player = req.user
  coachReview.save((err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      return res.status(200).json({ message: 'Creation of review succeeded.' })
    }
  })
}

exports.addReview = addReview
