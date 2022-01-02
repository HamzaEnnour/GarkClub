const express = require('express')
const {
  statByAcademy,
  statCoach,
  statPlayer
} = require('../services/stat/index')
const auth = require('../middleware/auth')
const router = express.Router()
router.get('/coach', auth, statCoach)
router.get('/player', auth, statPlayer)
router.get('/owner/:id', auth, statByAcademy)

module.exports = router
