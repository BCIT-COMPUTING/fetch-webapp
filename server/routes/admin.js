const router = require("express").Router();
const collectionName = "stats";
const Stats = require("../models/Stats");

router.get("/stats", async function (req, res) {
  try {
    const stats = await Stats.find();
    res.json(stats);
  } catch(err) {
    console.log(err);
    throw err;
  }

  console.log("stats in admin.js hit");
  res.send('stats in admin.js hit');
});











module.exports = router;