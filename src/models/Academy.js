const mongoose = require('mongoose')

const academySchema = mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  frais: {
    type: Number
  },
  lng: {
    type: Number
  },
  lat: {
    type: Number
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  coaches: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  opening: {
    type: String
  },
  closing: {
    type: String
  }
})

const Academy = mongoose.model('academy', academySchema)

module.exports = Academy
