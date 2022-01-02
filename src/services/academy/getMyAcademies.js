const mongoose = require('mongoose')
const Academy = mongoose.model('academy')

const getMyAcademies = async (req, res) => {
  try {
    const academies = await Academy.find({ owner: req.user })
    if (academies) {
      res.status(200).send(academies)
    } else {
      res.status(204).json({ message: 'User has no academies.' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
exports.getMyAcademies = getMyAcademies
