const mongoose = require('mongoose')
const Groupe = mongoose.model('groupe')

const editGroupe = async (req, res) => {
  try {
    const { id } = req.params
    const groupe = await Groupe.findById(id)
    if (groupe) {
      Groupe.updateOne(
        { _id: id },
        {
          name: req.body.name,
          color: req.body.color,
          coach: req.body.coach
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Edit of groupe succeeded.' })
          }
        }
      )
    } else {
      res.status(404).json({ message: 'No Groupe' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.editGroupe = editGroupe
