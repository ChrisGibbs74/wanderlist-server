const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  timesVisited: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  overallRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  costRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  nightlifeRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  sightseeingRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  dateVisited: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Visit', visitSchema)