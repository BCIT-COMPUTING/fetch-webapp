
const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const admin = require("../configs/adminUtils");

dotenv.config();

//REGISTER LOGIC
router.post("/register", async (req, res) => {

  /*
      #swagger.parameters['register info'] = {
        in: 'body',
        description: 'Information for registering to the app.',
        schema: {
          username: 'JhonDoe',
          firstname: 'Jhon',
          lastname: 'Doe',
          email: 'jhondoe@yahoo.ca',
          password: 'yourPasswordGoesHere',
        }
  } */

  await admin.updateStats("postRegister");

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
    /* #swagger.responses[201] = {
        description: 'New account has been created, returns the saved user.',
        schema: {
          username: 'string',
          firstname: 'string',
          lastname: 'string',
          email: 'string',
          password: 'string',
        }
  } */
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN LOGIC HERE
router.post("/login", async (req, res) => {
  /*
    #swagger.parameters['credentials'] = {
          in: 'body',
          description: 'Credentials of a user for login purposes.',
          schema: {
              $username: 'Jhon Doe',
              $password: 'someHashedPassword',
          }
  } */

  await admin.updateStats("postLogin");

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

  /* #swagger.responses[200] = {
        description: 'Login token is successfully obtained.',
        schema: {
          userInfo : {},
          accessToken: 'generated JWT token'
        }
  } */

});

router.post("/verifyJWT", async (req, res) => {


  /*
      #swagger.parameters['register info'] = {
        in: 'body',
        description: 'Verifies the JWT token submitted.',
        schema: {
          jwt: 'someEncodedJWT',
        }
  } */

  await admin.updateStats("postVerifyJWT");

  try {
    jwt.verify(req.body.jwt, process.env.JWT_SEC);
    res.send(true);
  } catch {
    res.send(false);
  }
    /* #swagger.responses[200] = {
        description: 'Returns true if token could be verified, else returns false.',
        schema: true
  } */
});
module.exports = router;
