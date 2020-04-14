const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  displayName: String,
  password: String,
  email: String,
  location: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
