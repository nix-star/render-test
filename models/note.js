const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

if (!url) {
  throw new Error('MONGODB_URI is not defined')
}

mongoose.connect(url, { family: 4 })
  .then(logger.info('connected to MongoDB'))
  .catch(error => logger.info('error connecting to MongoDB:', error.message))

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
