const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId:    { type: String, required: true },
  name:      { type: String, default: 'Anonymous' },
  event:     { type: String, required: true },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  enjoy:     { type: String, default: '' },
  improve:   { type: String, default: '' },
  tags:      [String],
  recommend: { type: String, default: '' },
  date:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);