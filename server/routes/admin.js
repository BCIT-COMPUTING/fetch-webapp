const router = require("express").Router();


router.get("/stats", function (req, res) {
  console.log("stats hit");
  res.status(200).send('ok from admin.js');
});











module.exports = router;