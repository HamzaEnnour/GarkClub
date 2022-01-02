const express = require('express')
const {
  addReview,
  getReviewsByCoach,
  checkIfReviewed,
  getMeanReviewForCoach
} = require('../services/coachReview/index')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', auth, getReviewsByCoach)
router.get('/check/:id', auth, checkIfReviewed)
router.get('/mean/:id', auth, getMeanReviewForCoach)
router.post('/', auth, addReview)
module.exports = router
