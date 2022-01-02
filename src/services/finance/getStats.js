const mongoose = require('mongoose')
const Finance = mongoose.model('finance')
const Academy = mongoose.model('academy')
const Abonnement = mongoose.model('abonnement')

const getStats = async (req, res) => {
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
  if (!finances) {
    return res.json({ income: 0, spent: 0, benifits: 0 })
  }
  let income = 0
  let spent = 0
  finances.forEach((el) => {
    if (el.isSpent) {
      spent += el.amount
    } else {
      income += el.amount
    }
  })
  dataMonth.forEach((el) => {
    income += el.frais || 0
  })
  let benifits = income - spent
  return res.json({ income, spent, benifits })
}
exports.getStats = getStats
