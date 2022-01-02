const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String
    },

    groupe: {
      type: mongoose.Types.ObjectId,
      ref: 'groupe'
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const Event = mongoose.model('event', eventSchema)
module.exports = Event
