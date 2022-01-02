/* eslint-disable no-console */
const mongoose = require('mongoose')
const config = require('.')

const connectDb = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  }
  mongoose
    .connect(`mongodb://localhost:27017/server_club`, options)
    .then(() => console.log(`(DataBase) : Connected to ...`))
    .catch((error) => {
      console.log(error)
      console.log('DataBase Connection Error: ', error.message)
      process.exit(1)
    })
  return mongoose.connection
}

const clearDb = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

const closeDb = async () => await mongoose.connection.close()

exports.connectDb = connectDb
exports.clearDb = clearDb
exports.closeDb = closeDb
