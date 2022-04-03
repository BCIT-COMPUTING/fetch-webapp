const req = require('express/lib/request');
const res = require('express/lib/response');
const Match = require('../models/Match');
const router = require('express').Router();

//get dog by dog id
router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const found = await Match.findOne({ userId : id});
    // console.log(found);
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
  try{
    const found = await Match.find({ userId : id});
    console.log(found[0].likes.includes(dogId));
    if(!found[0].likes.includes(dogId)) {
      console.log('not found');
      const update = await Match.findOneAndUpdate({ userId : id}, {$push: {likes: dogId}});
      res.json(update);
    } else {
      console.log('found');
      res.json(found);
    }
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
    const found = await Match.find({ userId : id});
    if(!found[0].dislikes.includes(dogId)) {
      console.log('not found');
      const update = await Match.findOneAndUpdate({ userId : id}, {$push: {dislikes: dogId}});
      res.json(update);
    } else {
      console.log('found');
      res.json(found);
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
});

router.get('/checkUser/:id', async(req, res) => {
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
})

router.post('/checkLikes', async(req, res) => {
  console.log("check likes hit");
  const { id } = req.params;

  // console.log(req.body);
  const likesArray = req.body.likes;
  console.log(likesArray);
  console.log(typeof(likesArray));

  let returnArray = []; 

  for (let like of likesArray) {
    console.log(like);
  }



  

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
})

module.exports = router;