const statsId = "6241058df33aa8eeb752c09e";
const Stats = require("../models/Stats");

const updateStats = async (stat) => {
  const stats = await Stats.find();
  var incrementedVal;

  switch (stat) {
    
    case "postLogin":
      incrementedVal = await stats[0].postLogin + 1;
      await Stats.updateOne({_id: statsId }, {
        postLogin: incrementedVal
      });
      break;

    case "postRegister":
      incrementedVal = await stats[0].postRegister + 1;
      await Stats.updateOne({_id: statsId }, {
        postRegister: incrementedVal
      });
      break;

    default:
      console.log("nope");
      break;
  }

}


module.exports = {
  statsId,
  updateStats
}
