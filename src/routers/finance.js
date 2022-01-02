const express = require('express')
const {
  createIncome,
  createSpent,
  getAllByAcademy,
  getStats
} = require('../services/finance/index')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/:academy', auth, getAllByAcademy)
router.post('/:academy', auth, createIncome)
router.post('/spents/:academy', auth, createSpent)
router.get('/stats/:academy', auth, getStats)
module.exports = router
