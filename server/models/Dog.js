const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    photo: { type: String },
    breed: { type: String },
    age: { type: Number },
    description: { type: String },
    gender: { type: String },
  }
);

module.exports = mongoose.model("Dog", DogSchema);
