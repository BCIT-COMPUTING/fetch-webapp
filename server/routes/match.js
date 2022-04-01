const Match = require('../models/Match');
const router = require('express').Router();

//get dog by dog id
router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const found = await Match.findOne({ userId : id});
    console.log(found);
    res.json(found);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add a dog id to likes array
router.post('/addLikes/:id', async(res, req) => {
  const { id } = req.params;
  const { dogId } = req.body;
  console.log(dogId);
  try{
    const found = await Match.findOneAndUpdate({ userId : id}, {$push: {likes: dogId}});
    console.log(found);
    res.json(found);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;