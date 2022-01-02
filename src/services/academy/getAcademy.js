const mongoose = require('mongoose')
const Academy = mongoose.model('academy')
const getAcademyById = async (req, res) => {
  try {
    const { id } = req.params
    const academy = await Academy.findById(id).populate('owner')
    if (academy) {
      res.status(200).send(academy)
    } else {
      res.status(204).json({ message: 'No Academy' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getAcademyById = getAcademyById
