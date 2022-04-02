const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    likes: { type: [String]},
    dislikes: { type: [String]},
  }
);

module.exports = mongoose.model('Match', MatchSchema);