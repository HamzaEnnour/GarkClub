const express = require('express')
const {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventsByGroupe,
  getEventsByAcademy,
  getEventsByCoach,
  getEventsByPlayer
} = require('../services/event/index')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/groupe/:id', auth, getEventsByGroupe)
router.get('/academy/:id', auth, getEventsByAcademy)
router.get('/coach/:id', auth, getEventsByCoach)
router.get('/player/:id', auth, getEventsByPlayer)
router.get('/', auth, getAllEvents)
router.post('/:id', auth, addEvent)
router.put('/:id', auth, editEvent)
router.delete('/:id', auth, deleteEvent)
module.exports = router
