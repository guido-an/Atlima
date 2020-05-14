const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spotSchema = new Schema({
  location: Object,
  placeId: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]

})

const Spot = mongoose.model('Spot', spotSchema)
module.exports = Spot
