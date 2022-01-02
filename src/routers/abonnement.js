const express = require('express')
const { addAbonement, checkPayment } = require('../services/abonnement/index')
const auth = require('../middleware/auth')
const router = express.Router()
router.post('/', auth, addAbonement)
router.get('/:academy', auth, checkPayment)

module.exports = router
