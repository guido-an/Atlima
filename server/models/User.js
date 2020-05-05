const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
  mediaArray: Array,
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  team: String,
  hometown: String,
  country: String,
  tour: Array,
  sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }],
  achievements: Array,
  provider: String,
  facebookId: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
