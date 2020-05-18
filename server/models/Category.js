const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: String,
  description: String,
  picture: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]

})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
