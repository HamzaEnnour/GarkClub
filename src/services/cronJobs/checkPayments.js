const mongoose = require('mongoose')
const { endOfDay } = require('../../utils/generateDates')
const { sendNotification } = require('../../utils/sendNotification')
const { config } = require('../../config/index')
const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')
const User = mongoose.model('User')
const Abonnement = mongoose.model('abonnement')

const checkPayments = async () => {
  firebase.initializeApp(config.firebase)
  let players = await User.find({ role: 'player' })
  if (players) {
    await Promise.all(
      players.map(async (player) => {
        const abonnement = await Abonnement.findOne({
          player: player._id,
          endTime: { $lte: endOfDay }
        }).populate('player')
        if (!abonnement) {
          sendNotification(
            'abonnement expiré',
            'svp payé votre abonnement avant la suspension',
            abonnement.player.notificationToken
          )
          //send Notification
        }
      })
    )
  }
}

exports.checkPayments = checkPayments
