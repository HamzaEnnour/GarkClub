const express = require('express')
const {
  addGroupe,
  deleteGroupe,
  editGroupe,
  getAllGroupes,
  getGroupesByAcademy,
  getPlayers,
  addplayersToGroup,
  retirerPlayer,
  getGroupesByCoachId,
  getCoachByPlayerId,
  getPlayersWithState
} = require('../services/groupe/index')
const auth = require('../middleware/auth')
const router = express.Router()
router.post('/addplayersToGroup/:id', auth, addplayersToGroup)
router.delete('/retirerPlayerFromGroup/:user/:groupe', auth, retirerPlayer)
router.get('/mine/:id', auth, getGroupesByAcademy)
router.get('/players/:id', auth, getPlayers)
router.get('/players-state/:id', auth, getPlayersWithState)

router.get('/getGroupesByCoachId/:id', auth, getGroupesByCoachId)
router.get('/getCoachByPlayerId/:id', auth, getCoachByPlayerId)
router.get('/', auth, getAllGroupes)
router.post('/:id', auth, addGroupe)
router.put('/:id', auth, editGroupe)
router.delete('/:id', auth, deleteGroupe)
module.exports = router
