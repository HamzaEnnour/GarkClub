const mongoose = require('mongoose')
const Academy = mongoose.model('academy')

const getCoaches = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id).populate('coaches')
    res.status(200).send(academy.coaches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getCoaches = getCoaches
