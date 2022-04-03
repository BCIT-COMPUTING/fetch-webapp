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
  const postAddDog = "postAddDog";
  const putEditDog = "putEditDog";
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

    default:
      console.log("NOTHING HERE: TODO");
      break;
  }

}

module.exports = {
  statsId,
  updateStats
}
