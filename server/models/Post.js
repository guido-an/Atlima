const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  mediaFile: Array,
  content: String,
  title: String,
  tumbnail: String,
  spot: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taggedAthletes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    _id: false,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    date: Date
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
