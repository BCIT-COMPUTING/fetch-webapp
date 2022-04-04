const router = require("express").Router();
const Stats = require("../models/Stats");
const admin = require('../configs/adminUtils');


router.get("/stats", async function (req, res) {
  try {
    await admin.updateStats("getStats");
    const stats = await Stats.find();
    res.send(stats);
  } catch (e) {
    console.error(e);
  }
  
});

router.post("/reset", async function (req, res) {
  try {
    await admin.updateStats("postReset");
    await Stats.updateOne({_id: admin.statsId }, {
      postRegister: 0,
      postLogin: 0,
      postVerifyJWT: 0,
      getDogs: 0,
      postAddDog: 0,
      putEditDog: 0,
      deleteDog: 0,
      getDogByUserId: 0,
      getDogByDogId: 0,
      postCreateMatch: 0,
      putAddLikeById: 0,
      putAddViewById: 0,
      putAddDislikeById: 0,
      getCheckUserByUserId: 0,
      getAllLikesByUserId: 0,
      getStats: 0,
    });
    res.send('reset OK');
  } catch (e) {
    console.error(e);
  }

})











module.exports = router;