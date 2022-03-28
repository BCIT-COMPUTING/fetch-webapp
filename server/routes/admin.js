const router = require("express").Router();
const Stats = require("../models/Stats");
const admin = require('../configs/adminUtils');


router.get("/stats", async function (req, res) {
  admin.updateStats("getStats");

  try {
    const stats = await Stats.find();
    res.send(stats);
  } catch (e) {
    console.error(e);
  }
  
  
});

router.post("/reset", async function (req, res) {
  admin.updateStats("postReset");

  try {
    await Stats.updateOne({_id: admin.statsId }, {
      postRegister: 0,
      postLogin: 0,
      postVerifyJWT: 0,
      getDogs: 0,
      postAddEditDog: 0,
      deleteDog: 0,
      getDogById: 0,
      getStats: 0,
    });
    res.send('reset OK');
  } catch (e) {
    console.error(e);
  }

})











module.exports = router;