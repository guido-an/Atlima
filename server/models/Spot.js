const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spotSchema = new Schema({
  location: Object,
  placeId: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Spot = mongoose.model('Spot', spotSchema)
module.exports = Spot
