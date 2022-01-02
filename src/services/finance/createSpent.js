const mongoose = require('mongoose')
const Finance = mongoose.model('finance')
const Academy = mongoose.model('academy')
const createSpent = async (req, res) => {
  const { label, type, amount, date } = req.body
  const { academy: academyId } = req.params
  const academy = await Academy.findById(academyId)
  const finance = new Finance({
    label,
    type,
    amount,
    isSpent: true,
    academy,
    date
  })
  await finance.save()
  res.json(finance)
}

exports.createSpent = createSpent
