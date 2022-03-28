const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//REGISTER LOGIC
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    //saving the user  to db
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN LOGIC HERE
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(401).json("Wrong Credentials");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const orgPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (orgPassword !== req.body.password) {
      res.status(401).json("Wrong Password");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/verifyJWT", (req, res) => {
  try {
    jwt.verify(req.body.jwt, process.env.JWT_SEC);
    res.send(true);
  } catch {
    res.send(false);
  }
});
module.exports = router;
