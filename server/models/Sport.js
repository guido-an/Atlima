const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportSchema = new Schema({
  name: String,
  description: String,
  picture: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]

})

const Sport = mongoose.model('Sport', sportSchema)
module.exports = Sport
