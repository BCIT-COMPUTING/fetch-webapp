
const router = require("express").Router();
const authRoute = require("./auth");
const dogRoute = require("./dog");
const adminRoute = require("./admin");
const matchRoute = require("./match");

router.use("/auth", authRoute);
router.use("/dog", dogRoute);
router.use("/admin", adminRoute);
router.use("/match", matchRoute);
module.exports = router;