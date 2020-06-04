const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
  mediaArray: Array,
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  provider: String,
  facebookId: String,
  notifications: Array,
  unreadNotifications: { type: Number, default: 0 },
  followedSpots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spot' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
