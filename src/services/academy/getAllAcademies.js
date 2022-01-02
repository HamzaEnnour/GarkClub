const mongoose = require('mongoose')
const Academy = mongoose.model('academy')

const getAllAcademies = async (req, res) => {
  try {
    const academies = await Academy.find({})
    res.status(200).send(academies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllAcademies = getAllAcademies
