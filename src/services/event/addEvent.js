const mongoose = require('mongoose')

const Groupe = mongoose.model('groupe')
const Event = mongoose.model('event')

const addEvent = async (req, res) => {
  const { id } = req.params
  const groupe = await Groupe.findById(id)
  if (groupe) {
    const event = new Event(req.body)
    event.groupe = groupe
    event.save((err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      } else {
        return res.status(200).json(result)
      }
    })
  } else {
    return res.status(500).send({ message: 'No Groupe with this credentials' })
  }
}

exports.addEvent = addEvent
