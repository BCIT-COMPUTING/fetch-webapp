const router = require("express").Router();
const collectionName = "stats";
const Stats = require("../models/Stats");

router.get("/stats", async function (req, res) {
  console.log("stats in admin.js hit");
  const stats = await Stats.find();
  console.log(stats);
  
  res.send(stats);
});











module.exports = router;