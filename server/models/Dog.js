const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userID: { type: String },
    photo: { type: String },
    breed: { type: String },
    age: { type: Number },
    description: { type: String },
    gender: { type: String },
    likes: { type: [String]}
  }
);

module.exports = mongoose.model("Dog", DogSchema);
