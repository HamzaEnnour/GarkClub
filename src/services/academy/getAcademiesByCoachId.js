const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')

const getAcademiesByCoachId = async (req, res) => {
  try {
    const { id } = req.params
    const groupes = await Groupe.find({ coach: id }).populate('academy')
    //console.log(groupes)
    let academies = new Array()
    groupes.forEach((groupe) => {
      if (groupe.academy) {
        academies = academies.concat(groupe.academy)
      }
    })
    const distinctAcademies = academies.filter(
      (a, i) => academies.findIndex((s) => a._id === s._id) === i
    )
    res.status(200).send(distinctAcademies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAcademiesByCoachId = getAcademiesByCoachId
