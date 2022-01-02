const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')

const getAllGroupes = async (req, res) => {
  try {
    const groupes = await Groupe.find({})
    res.status(200).send(groupes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllGroupes = getAllGroupes
