const mongoose = require('mongoose')
const EventReview = mongoose.model('eventReview')

const calculateReview = async (playerId) => {
  try {
    const reviews = await EventReview.find({
      player: playerId
    })
    if (reviews && reviews.length > 0) {
      let calculatedData = {
        PAC: 0,
        SHO: 0,
        PAS: 0,
        DRI: 0,
        DEF: 0,
        PHY: 0,
        nbOfGoals: 0,
        nbOfAssist: 0,
        mean: 0
      }
      reviews.forEach((review) => {
        calculatedData.PAC = calculatedData.PAC + Number.parseInt(review.pace)
        calculatedData.SHO = calculatedData.SHO + Number.parseInt(review.shot)
        calculatedData.PAS = calculatedData.PAS + Number.parseInt(review.passe)
        calculatedData.DRI = calculatedData.DRI + Number.parseInt(review.drible)
        calculatedData.DEF =
          calculatedData.DEF + Number.parseInt(review.defence)
        calculatedData.PHY =
          calculatedData.PHY + Number.parseInt(review.physique)
        calculatedData.nbOfGoals =
          calculatedData.nbOfGoals + Number.parseInt(review.nbOfGoals)
        calculatedData.nbOfAssist =
          calculatedData.nbOfAssist + Number.parseInt(review.nbOfAssist)
      })
      calculatedData.PAC = Number.parseInt(
        Number.parseFloat(calculatedData.PAC / reviews.length).toFixed(0)
      )
      calculatedData.SHO = Number.parseInt(
        Number.parseFloat(calculatedData.SHO / reviews.length).toFixed(0)
      )
      calculatedData.PAS = Number.parseInt(
        Number.parseFloat(calculatedData.PAS / reviews.length).toFixed(0)
      )
      calculatedData.DRI = Number.parseInt(
        Number.parseFloat(calculatedData.DRI / reviews.length).toFixed(0)
      )
      calculatedData.DEF = Number.parseInt(
        Number.parseFloat(calculatedData.DEF / reviews.length).toFixed(0)
      )
      calculatedData.PHY = Number.parseInt(
        Number.parseFloat(calculatedData.PHY / reviews.length).toFixed(0)
      )
      calculatedData.mean = Number.parseInt(
        Number.parseFloat(
          (calculatedData.PHY +
            calculatedData.SHO +
            calculatedData.PAS +
            calculatedData.DRI +
            calculatedData.DEF +
            calculatedData.PAC) /
            6
        ).toFixed(0)
      )
      return calculatedData
    } else {
      let data = {
        PAC: 50,
        SHO: 50,
        PAS: 50,
        DRI: 50,
        DEF: 50,
        PHY: 50,
        nbOfGoals: 0,
        nbOfAssist: 0,
        mean: 50
      }
      return data
    }
  } catch (error) {
    throw new Error(error)
  }
}

exports.calculateReview = calculateReview
