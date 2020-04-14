const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
  team: String,
  hometown: String,
  sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }],
  achievements: Array,
  provider: String,
  facebookId: { type: String, unique: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
