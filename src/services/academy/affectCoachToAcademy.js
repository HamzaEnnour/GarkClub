const mongoose = require('mongoose')
const User = mongoose.model('User')
const Academy = mongoose.model('academy')

function arrayContainsObject(array, object, key) {
  for (let i = 0; i < array.length; i++) {
    if (String(object[key]) == String(array[i][key])) {
      return true
    }
  }
  return false
}

const affectCoachToAcademy = async (req, res) => {
  try {
    const { user: userId, academy: academyId } = req.params
    const user = await User.findById(userId)
    const academy = await Academy.findById(academyId).populate('coaches')
    let arrCoaches = academy.coaches

    if (arrayContainsObject(arrCoaches, user, '_id')) {
      res.status(202).json({ message: 'Coeach Already Exist' })
    } else {
      arrCoaches.push(user._id)
      Academy.updateOne(
        { _id: academyId },
        {
          coaches: arrCoaches
        },
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          } else {
            res
              .status(202)
              .json({ message: 'Creation of coach succeeded', coach: user })
          }
        }
      )
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

exports.affectCoachToAcademy = affectCoachToAcademy
