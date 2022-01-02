const mongoose = require('mongoose')
const Materiel = mongoose.model('materiel')

const editMateriel = async (req, res) => {
  try {
    const { id } = req.params
    const materiel = await Materiel.findById(id)
    if (materiel) {
      Materiel.updateOne(
        { _id: id },
        {
          category: req.body.category,
          unitPrice: req.body.unitPrice,
          quantity: req.body.quantity,
          name: req.body.name,
          coach: req.body.coach,
          players: req.body.players
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res.status(202).json({ message: 'Edit of Materiel succeeded.' })
          }
        }
      )
    } else {
      res.status(404).json({ message: 'No Materiel' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.editMateriel = editMateriel
