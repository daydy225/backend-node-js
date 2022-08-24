const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(result => {
    console.log('connected to mongoDB')
  })
  .catch(error => console.log('error connecting to mongoDB:', error.message))

const noteSchema = mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
