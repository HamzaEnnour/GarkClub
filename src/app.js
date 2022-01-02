const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000
const { connectDb } = require('./config/db')
const app = express()
app.use(cors({ credentials: true }))
const connection = connectDb()
const cron = require('node-cron')

require('./models/User')
require('./models/Academy')
require('./models/Groupe')
require('./models/Event')
require('./models/Materiel')
require('./models/Finance')
require('./models/EventReview')
require('./models/Abonnement')
require('./models/CoachReview')

require('./config/logging')()

const listen = () => {
  if (app.get('env') === 'test') return
  app.listen(port)
  // eslint-disable-next-line no-console
  console.log('Express app started on port ' + port)
}

app.use(express.json())
require('./routers/index')(app)

app.disable('x-powered-by')
app.use((req, res, next) => {
  res.setHeader('X-Gark-Api-Version', '1.0.0')
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

connection
  // eslint-disable-next-line no-console
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', listen)
/***
 * Cron jobs
 *
 */
const {
  checkPayments,
  checkPlayerReviewsWeekly
} = require('./services/cronJobs/index')
//Cron jobs form payments run first day on each month
cron.schedule('* * 1 * *', () => {
  checkPayments()
})
//Cron jobs form players Reviews run weekly on saturday at 00:59
cron.schedule('59 00 * * 7', () => {
  checkPlayerReviewsWeekly()
})
module.exports = app
