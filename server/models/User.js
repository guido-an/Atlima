const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  provider: String,
  facebookId: String,
  notifications: Array,
  unreadNotifications: { type: Number, default: 0 },
  followedSpots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spot' }],
  location: String,
  bio: String,
  profilePicture: Object,
  backgroundPicture: Object,
  followedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
