const statsId = "6241058df33aa8eeb752c09e";
const Stats = require("../models/Stats");

const updateStats = async (stat) => {
  const postLogin = "postLogin";
  const postRegister = "postRegister";
  const postVerifyJWT = "postVerifyJWT";
  
  const getStats = "getStats";
  const postReset = "postReset";

  const getDogs = "getDogs";
  const getDogByUserId = "getDogByUserId";
  const getDogByDogId = "getDogByDogId";
  const postAddDog = "postAddDog";
  const putEditDog = "putEditDog";
  const deleteDog = "deleteDog";

  const postCreateMatch = "postCreateMatch";
  const putAddLikeById = "putAddLikeById";
  const putAddViewById = "putAddViewById";
  const putAddDislikeById = "putAddDislikeById";

  //1. don't forget to add to StatsSchema***********
  //2. also don't forget to add manually to MongoDB

  const stats = await Stats.find();
  var incrementedVal;

  switch (stat) {

    case postLogin:
      incrementedVal = await stats[0].postLogin + 1;
      await Stats.updateOne({_id: statsId }, {
        postLogin: incrementedVal
      });
      break;

    case postRegister:
      incrementedVal = await stats[0].postRegister + 1;
      await Stats.updateOne({_id: statsId }, {
        postRegister: incrementedVal
      });
      break;

    case postVerifyJWT:
      incrementedVal = await stats[0].postVerifyJWT + 1;
      await Stats.updateOne({_id: statsId }, {
        postVerifyJWT: incrementedVal
      });
      break;

    case getStats:
      incrementedVal = await stats[0].getStats + 1;
      await Stats.updateOne({_id: statsId }, {
        getStats: incrementedVal
      });
      break;

    case postReset:
      incrementedVal = await stats[0].postReset + 1;
      await Stats.updateOne({_id: statsId }, {
        postReset: incrementedVal
      });
      break;

    case getDogs:
      incrementedVal = await stats[0].getDogs + 1;
      await Stats.updateOne({_id: statsId }, {
        getDogs: incrementedVal
      });
      break;
    
    case getDogByUserId:
      incrementedVal = await stats[0].getDogByUserId + 1;
      await Stats.updateOne({_id: statsId }, {
        getDogByUserId: incrementedVal
      });
      break;

    case getDogByDogId:
      incrementedVal = await stats[0].getDogByDogId + 1;
      await Stats.updateOne({_id: statsId }, {
        getDogByDogId: incrementedVal
      });
      break;

    case postAddDog:
      incrementedVal = await stats[0].postAddDog + 1;
      await Stats.updateOne({_id: statsId }, {
        postAddDog: incrementedVal
      });
      break;

    case putEditDog:
      incrementedVal = await stats[0].putEditDog + 1;
      await Stats.updateOne({_id: statsId }, {
        putEditDog: incrementedVal
      });
      break;
    
    case deleteDog:
      incrementedVal = await stats[0].deleteDog + 1;
      await Stats.updateOne({_id: statsId }, {
        deleteDog: incrementedVal
      });
      break;

    case postCreateMatch:
      incrementedVal = await stats[0].postCreateMatch + 1;
      await Stats.updateOne({_id: statsId }, {
        postCreateMatch: incrementedVal
      });
      break;

    case putAddLikeById:
      incrementedVal = await stats[0].putAddLikeById + 1;
      await Stats.updateOne({_id: statsId }, {
        putAddLikeById: incrementedVal
      });
      break;

    case putAddViewById:
      incrementedVal = await stats[0].putAddViewById + 1;
      await Stats.updateOne({_id: statsId }, {
        putAddViewById: incrementedVal
      });
      break;

    case putAddDislikeById:
      incrementedVal = await stats[0].putAddDislikeById + 1;
      await Stats.updateOne({_id: statsId }, {
        putAddDislikeById: incrementedVal
      });
      break;
      
      

    default:
      console.log("NOTHING HERE: TODO");
      break;
  }

}

module.exports = {
  statsId,
  updateStats
}
