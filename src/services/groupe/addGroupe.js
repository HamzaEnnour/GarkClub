const mongoose = require('mongoose')

const Groupe = mongoose.model('groupe')
const Academy = mongoose.model('academy')

const addGroupe = async (req, res) => {
  const { id } = req.params
  const academy = await Academy.findById(id)
  if (academy) {
    const groupe = new Groupe(req.body)
    groupe.academy = academy
    groupe.save((err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(200)
          .json({ message: 'Creation of groupe succeeded.' })
      }
    })
  } else {
    return res.status(500).send({ message: 'No Academy with this credentials' })
  }
}

exports.addGroupe = addGroupe
