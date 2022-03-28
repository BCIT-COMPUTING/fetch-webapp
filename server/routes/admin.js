const router = require("express").Router();
const collectionName = "stats";
const Stats = require("../models/Stats");
const admin = require('../configs/adminUtils');


router.get("/stats", async function (req, res) {
  const stats = await Stats.find();
  res.send(stats);
});

router.post("/reset", async function (req, res) {
  console.log("reset hit");

  try {
    await Stats.updateOne({_id: admin.statsId }, {
      postRegister: 0,
      postLogin: 0,
      postVerifyJWT: 0,
      getDogs: 0,
      postAddEditDog: 0,
      deleteDog: 0,
      getDogById: 0
    });
    res.send('reset OK');
  } catch (e) {
    console.log(e);
  }

})











module.exports = router;