const Dog = require("../models/Dog");
const router = require("express").Router();

//get all dogs
router.get("/getDogs", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

//add or edit dog
router.post("/addEditDog", async (req, res) => {
  const { id, name, photo, breed, age, description, gender } = req.body;
  if(id === 'new') {
    //add new dog id is 'new' for add
    const newDog = new Dog({
      name,
      photo,
      breed,
      age,
      description,
      gender
    });
    try {
      const savedDog = await newDog.save();
      res.status(200).json(savedDog);
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    //edit the dog
    try {
      await Dog.updateOne({_id: id}, {
        name,
        photo,
        breed,
        age,
        description,
        gender
      });
    } catch(err) {
      throw err;
    }
  }
});

//delete dog by Id
router.post("/delete", async(req, res) => {
  const { id, } = req.body;
  await Dog.deleteOne({_id: id});
  res.status(200).json({status: 'success', id});
  try{

  } catch(err) {
    console.log(err);
    throw err;
  }
});

//get a dog by id
router.get("/:id", async(req, res) => {
  const { id } = req.params;
  try{
    const foundDog = await Dog.findById(id);
    // console.log(foundDog);
    res.json(foundDog);
  } catch(err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;