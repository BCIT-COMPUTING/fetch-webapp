const Dog = require('../models/Dog');
const router = require('express').Router();

//get all dogs
router.get('/getDogs', async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//get Dog by userID
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const foundDog = await Dog.findOne({ userID: id });
    console.log({foundDog});
    res.json(foundDog);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add dog
router.post('/addDog', async (req, res) => {
  const {
    name,
    userID,
    photo,
    breed,
    age,
    description,
    gender,
    likes } = req.body;

  const newDog = new Dog({
    name,
    userID,
    photo,
    breed,
    age,
    description,
    gender,
    likes
  });

  try {
    const savedDog = await newDog.save();
    res.status(200).json(savedDog);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//edit dog
router.put('/editDog', async (req, res) => {
  const { 
    id,
    name,
    userID,
    photo,
    breed,
    age,
    description,
    gender,
    likes 
        } = req.body;
    try {
      await Dog.updateOne({_id: id}, {
        name,
        userID,
        photo,
        breed,
        age,
        description,
        gender,
        likes
      });
    } catch(err) {
      throw err;
    }
});


//delete dog by Id
router.delete('/delete/:id', async(req, res) => {
  const { id } = req.params;
  console.log(`delete ${id}`);
  await Dog.deleteOne({_id: id});
  res.status(200).json({status: 'success', id});
  try{

  } catch(err) {
    console.log(err);
    throw err;
  }
});

//get a dog by id
router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const foundDog = await Dog.findById(id);
    res.json(foundDog);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;