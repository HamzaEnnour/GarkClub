const express = require('express')
const {
  changeToCoach,
  getAllUsers,
  changeToPlayer
} = require('../services/handleRoles/index')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/users', getAllUsers)
router.get('/player/:id', auth, changeToPlayer)
router.get('/coach/:id', auth, changeToCoach)
module.exports = router
