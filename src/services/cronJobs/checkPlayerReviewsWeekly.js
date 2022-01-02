const mongoose = require('mongoose')
const EventReview = mongoose.model('eventReview')
const User = mongoose.model('User')
const { startOfWeek } = require('../../utils/generateDates')
const { sendNotification } = require('../../utils/sendNotification')
const moment = require('moment')
const startOfLastWeek = +moment()
  .subtract(1, 'weeks')
  .startOf('week')
  .utcOffset(1)
  .hours(0)
  .minutes(0)
  .seconds(0)
  .milliseconds(0)
const { config } = require('../../config/index')
const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')
const checkPlayerReviewsWeekly = async () => {
  firebase.initializeApp(config.firebase)
  let players = await User.find({ role: 'player' })
  if (players) {
    await Promise.all(
      players.map(async (player) => {
        const reviewsThisWeek = await EventReview.find({
          player: player._id,
          createdAt: { $gte: startOfWeek }
        })
        const reviewsLastWeek = await EventReview.find({
          player: player._id,
          createdAt: { $gte: startOfLastWeek, $lte: startOfWeek }
        })
        if (
          reviewsThisWeek &&
          reviewsLastWeek &&
          reviewsLastWeek.length > 0 &&
          reviewsThisWeek.length > 0
        ) {
          const sumReviewsThisWeek = sumReviews(reviewsThisWeek)
          const sumReviewsLastWeek = sumReviews(reviewsLastWeek)
          if (sumReviewsThisWeek.mean > sumReviewsLastWeek.mean) {
            //send keep the hard Work Notification
            sendNotification(
              'Avancement',
              ' keep the hard Work',
              player.notificationToken
            )
          } else {
            //send encuregement Notification
            sendNotification(
              'Avancement',
              'You can do better',
              player.notificationToken
            )
          }
        }
      })
    )
  }
}
const sumReviews = (reviews) => {
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
      calculatedData.DEF = calculatedData.DEF + Number.parseInt(review.defence)
      calculatedData.PHY = calculatedData.PHY + Number.parseInt(review.physique)
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
}
exports.checkPlayerReviewsWeekly = checkPlayerReviewsWeekly
