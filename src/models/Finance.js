const mongoose = require('mongoose')

const financeSchema = mongoose.Schema(
  {
    academy: {
      type: mongoose.Types.ObjectId,
      ref: 'academy'
    },
    label: {
      type: String
    },
    type: {
      type: String
    },
    amount: {
      type: Number
    },
    isSpent: {
      type: Boolean
    },
    date: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const Finance = mongoose.model('finance', financeSchema)

module.exports = Finance
