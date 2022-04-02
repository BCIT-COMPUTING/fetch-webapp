const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema(
  {
    postRegister: Number,
    postLogin: Number,
    postVerifyJWT: Number,
    getDogs: Number,
    postAddEditDog: Number,
    deleteDog: Number,
    getDogById: Number,
    getStats: Number,
    postReset: Number
  },
);

module.exports = mongoose.model("Stats", StatsSchema);
