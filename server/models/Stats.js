const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema(
  {
    postRegister: Number,
    postLogin: Number,
    postVerifyJWT: Number,
    getDogs: Number,
    postAddDog: Number,
    putEditDog: Number,
    deleteDog: Number,
    getDogByUserId: Number,
    getStats: Number,
    postReset: Number,
    postCreateMatch: Number,
    putAddLikeById: Number,
    putAddViewById: Number,
    putAddDislikeById: Number
  },
);

module.exports = mongoose.model("Stats", StatsSchema);
