const express = require('express')
const {
  addAcademy,
  deleteAcademy,
  editAcademy,
  getAllAcademies,
  getMyAcademies,
  affectCoachToAcademy,
  retirerCoachFromAcademy,
  getCoaches,
  getAcademyById,
  getPlayersByAcademy,
  getAcademiesByCoachId,
  updateImage
} = require('../services/academy/index')
const auth = require('../middleware/auth')
const router = express.Router()
router.post('/', auth, addAcademy)
router.post('/affectCoachToAcademy/:user/:academy', auth, affectCoachToAcademy)
router.post(
  '/retirerCoachFromAcademy/:user/:academy',
  auth,
  retirerCoachFromAcademy
)
router.get('/mine', auth, getMyAcademies)
router.get('/coaches/:id', auth, getCoaches)
router.get('/players/:id', getPlayersByAcademy)
router.get('/getAcademiesByCoachId/:id', getAcademiesByCoachId)
router.get('/:id', getAcademyById)
router.get('/', auth, getAllAcademies)
router.put('/:id', auth, editAcademy)
router.put('/image/:id', auth, updateImage)
router.delete('/:id', auth, deleteAcademy)
module.exports = router
