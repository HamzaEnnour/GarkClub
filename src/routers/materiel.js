const express = require('express')
const {
  addMateriel,
  deleteMateriel,
  editMateriel,
  getAllMateriels,
  getMaterielsByAcademy
} = require('../services/materiel/index')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/academy/:id', auth, getMaterielsByAcademy)
router.get('/', auth, getAllMateriels)
router.post('/:id', auth, addMateriel)
router.put('/:id', auth, editMateriel)
router.delete('/:id', auth, deleteMateriel)
module.exports = router
