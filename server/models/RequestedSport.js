const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestedSportSchema = new Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const RequestedSport = mongoose.model('RequestedSport', requestedSportSchema)
module.exports = RequestedSport
