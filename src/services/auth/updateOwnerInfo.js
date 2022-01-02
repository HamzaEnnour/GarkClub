const mongoose = require('mongoose')

const User = mongoose.model('User')

const updateOwnerInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { firstName, lastName, telephone, address } = req.body
    user.firstName = firstName
    user.lastName = lastName
    user.telephone = telephone
    user.address = address
    user.save((err) => {
      if (err) {
        return res.status(500).send({ message: 'An unexpected error occurred' })
      }
      return res.status(200).send({ message: 'updates Done.' })
    })
  } catch (e) {
    return res.status(500).send({ message: 'An unexpected error occurred' })
  }
}

exports.updateOwnerInfo = updateOwnerInfo
