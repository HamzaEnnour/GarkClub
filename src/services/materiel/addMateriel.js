const mongoose = require('mongoose')

const Materiel = mongoose.model('materiel')
const Academy = mongoose.model('academy')

const addMateriel = async (req, res) => {
  const { id } = req.params
  const academy = await Academy.findById(id)
  if (academy) {
    const materiel = new Materiel(req.body)
    materiel.academy = academy
    materiel.save((err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      } else {
        return res.status(200).json({
          message: 'Creation of materiel succeeded.',
          equipment: materiel
        })
      }
    })
  } else {
    return res.status(500).send({ message: 'No Academy with this credentials' })
  }
}

exports.addMateriel = addMateriel
