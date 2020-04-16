const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  mediaArray: Array,
  content: String,
  location: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tag_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
