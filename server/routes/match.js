const Match = require('../models/Match');
const router = require('express').Router();
const admin = require('../configs/adminUtils');

//get dog by dog id
router.get('/:id', async(req, res) => {
  await admin.updateStats("getDogByDogId");

  const { id } = req.params;
  console.log('match:id ' + id);
  try{
    const found = await Match.find({ userId : id});
    console.log(found);
    res.json(found);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//create match
router.post('/add', async(req, res) => {
  await admin.updateStats("postCreateMatch");

  const { userId } = req.body;
  try{
      const newMatch = new Match({
        userId,
        likes: [],
        dislikes: [],
        viewed: []
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
  await admin.updateStats("putAddLikeById");

  const { id } = req.params;
  const { dogId } = req.body;
  try{
    const found = await Match.find({ userId : id});
    if(!found[0].likes.includes(dogId)) {
      const update = await Match.findOneAndUpdate({ userId : id}, {$push: {likes: dogId}});
      res.json(update);
    } else {
      res.json(found);
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add a dog id to viewed array
router.put('/addView/:id', async(req, res) => {
  await admin.updateStats("putAddViewById");

  const { id } = req.params;
  const { dogId } = req.body;
  try{
    const found = await Match.find({ userId : id});
    if(!found[0].viewed.includes(dogId)) {
      const update = await Match.findOneAndUpdate({ userId : id}, {$push: {viewed: dogId}});
      res.json(update);
    } else {
      res.json(found);
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add a dog id to dislikes array
router.put('/addDislikes/:id', async(req, res) => {
  await admin.updateStats("putAddDislikeById");

  const { id } = req.params;
  const { dogId } = req.body;
  try{
    const found = await Match.find({ userId : id});
    if(!found[0].dislikes.includes(dogId)) {
      const update = await Match.findOneAndUpdate({ userId : id}, {$push: {dislikes: dogId}});
      res.json(update);
    } else {
      res.json(found);
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
});

router.get('/checkUser/:id', async(req, res) => {
  await admin.updateStats("getCheckUserByUserId");

  const { id } = req.params;
  try{
    const found = await Match.findOne({ userId : id});
    if (found) {
      res.json({result: true});
    } else {
      res.json({result: false});
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
});

router.get('/allLikes/:id', async (req, res) => {
  await admin.updateStats("getAllLikesByUserId");

  const { id } = req.params;
  console.log(id);
  try{
    const found = await Match.find({ likes : id});
    console.log(found);
    res.json(found);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;