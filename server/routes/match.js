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

//create match
router.post('/add', async(req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try{
    const newMatch = new Match({
      userId,
      likes: [],
      dislikes: []
    });
    const savedMatch = await newMatch.save();
    res.status(200).json(savedMatch);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add a dog id to likes array
router.put('/addLikes/:id', async(req, res) => {
  const { id } = req.params;
  const { dogId } = req.body;
  console.log(dogId);
  try{
      const found = await Match.findOneAndUpdate({ userId : id}, {$push: {likes: dogId}});
      res.json(found);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add a dog id to dislikes array
router.put('/addDislikes/:id', async(req, res) => {
  const { id } = req.params;
  const { dogId } = req.body;
  console.log(dogId);
  try{
      const found = await Match.findOneAndUpdate({ userId : id}, {$push: {dislikes: dogId}});
      res.json(found);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;