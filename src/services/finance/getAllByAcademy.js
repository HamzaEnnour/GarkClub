const mongoose = require('mongoose')
const Finance = mongoose.model('finance')
const Academy = mongoose.model('academy')
const Abonnement = mongoose.model('abonnement')
const moment = require('moment')

const getAllByAcademy = async (req, res) => {
  const { academy: academyId } = req.params
  const academy = await Academy.findById(academyId)
  let date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  let firstDayMonth = new Date(y, m, 1).setHours(1, 0, 0)
  let lastDayMonth = new Date(y, m + 1, 0).setHours(0, 59, 59)
  let finances = await Finance.find({
    academy: academy,
    date: {
      $lte: lastDayMonth,
      $gte: firstDayMonth
    }
  })
  const dataMonth = await Abonnement.find({
    academy: academy,
    StartTime: {
      $lte: lastDayMonth,
      $gte: firstDayMonth
    }
  })
  let reservationIncomePerDay = dataMonth.reduce(function (
    result,
    reservation
  ) {
    var day = moment(reservation.StartTime).format('YYYY-MM-DD')
    if (!result[day]) {
      result[day] = 0
    }
    result[day] += reservation.frais
    return result
  },
  {})

  const objectArray = Object.entries(reservationIncomePerDay)
  let reservationsArray = []
  objectArray.forEach(([key, value]) => {
    reservationsArray.push({ day: key, income: value })
    if (+value != 0) {
      let f = new Finance({
        amount: +value,
        date: new Date(key),
        isSpent: false,
        label: 'Abonnements'
      })

      finances.push(f)
    }
  })
  res.json({ finances, dataMonth })
}
exports.getAllByAcademy = getAllByAcademy
