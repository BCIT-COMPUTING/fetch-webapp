const router = require("express").Router();
const Stats = require("../models/Stats");
const admin = require('../configs/adminUtils');

const OKAY = 200;


router.get("/stats", async (req, res) => {
  /*
    #swagger.description = 'Returns the stats for all of the endpoints',
  } */

  /* #swagger.responses[200] = {
    description: 'Stats successfully obtained.',
    schema: {
      postRegister: 6,
      postLogin: 25,
      postVerifyJWT: 65,
      getDogs: 34,
      postAddDog: 77,
      putEditDog: 23,
      deleteDog: 6,
      getDogByUserId: 64,
      getDogByDogId: 23,
      postCreateMatch: 76,
      putAddLikeById: 87,
      putAddViewById: 65,
      putAddDislikeById: 37,
      getCheckUserByUserId: 85,
      getAllLikesByUserId: 52,
      getStats: 65,
    }
  } */

  try {
    await admin.updateStats("getStats");
    const stats = await Stats.find();
    res.status(OKAY).send(stats);
  } catch (e) {
    console.error(e);
  }
  
});

router.post("/reset", async (req, res) => {
  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Resets the stats for all of the endpoints.',
    schema: {
      $postRegister: 0,
      $postLogin: 0,
      $postVerifyJWT: 0,
      $getDogs: 0,
      $postAddDog: 0,
      $putEditDog: 0,
      $deleteDog: 0,
      $getDogByUserId: 0,
      $getDogByDogId: 0,
      $postCreateMatch: 0,
      $putAddLikeById: 0,
      $putAddViewById: 0,
      $putAddDislikeById: 0,
      $getCheckUserByUserId: 0,
      $getAllLikesByUserId: 0,
      $getStats: 0,
    }
  } */
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
    res.status(OKAY).send('reset OK');
  } catch (e) {
    console.error(e);
  }

})











module.exports = router;