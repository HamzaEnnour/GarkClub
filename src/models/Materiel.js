const mongoose = require('mongoose')

const materielSchema = mongoose.Schema(
  {
    category: {
      type: String
    },
    action: {
      type: String
    },
    quantity: {
      type: Number
    },
    unitPrice: {
      type: Number
    },
    academy: {
      type: mongoose.Types.ObjectId,
      ref: 'academy'
    }
  },
  {
    timestamps: true
  }
)

const Materiel = mongoose.model('materiel', materielSchema)
module.exports = Materiel
