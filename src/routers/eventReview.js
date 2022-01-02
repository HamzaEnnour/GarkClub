const express = require('express')
const { create, checkReviews } = require('../services/eventReview/index')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/:event/:player', auth, create)
router.get('/:event', checkReviews)
module.exports = router
