const mongoose = require('mongoose')
const Abonnement = mongoose.model('abonnement')

const addAbonement = async (req, res) => {
  const abonnement = new Abonnement(req.body)
  abonnement.save((err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      return res
        .status(200)
        .json({ message: 'Creation of abonnement succeeded.' })
    }
  })
}

exports.addAbonement = addAbonement
