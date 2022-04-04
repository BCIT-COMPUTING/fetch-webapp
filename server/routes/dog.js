const Dog = require("../models/Dog");
const router = require("express").Router();
const admin = require("../configs/adminUtils");

const OKAY = 200;

//get all dogs
router.get("/getDogs/:id", async (req, res) => {
  /*
   #swagger.parameters['id'] =
    { description:
      "get all the dogs except the one that belongs to the user id -> id"}
  */
  await admin.updateStats("getDogs");
  console.log(req.params, "printing params");
  const { id } = req.params;

  try {
    const dogs = await Dog.find({ userID: { $nin: [id] } });
    console.log(dogs.length);
    res.json(dogs);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//get Dog by userID
router.get("/profile/:id", async (req, res) => {
  /*
   #swagger.parameters['id'] =
    { description:
      "get a particular dog by the user id"}
  */
  await admin.updateStats("getDogByUserId");

  const { id } = req.params;
  try {
    const foundDog = await Dog.findOne({ userID: id });
    res.json(foundDog);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//add dog
router.post("/addDog", async (req, res) => {
  /*
    #swagger.consumes = ['application/json']
    #swagger.parameters['doginfo'] = {
          in: 'body',
          description: 'Dog description',
          schema: {
            $name: 'Molly',
            $userID: '622edfa1c8d9ef0e2bc547c9',
            $photo: 'base64 String',
            $breed: 'Husky',
            $age: 5,
            $description: 'about the dog description',
            $gender:'Female',   
          }
  } */

  await admin.updateStats("postAddDog");

  const { name, userID, photo, breed, age, description, gender } = req.body;

  const newDog = new Dog({
    name,
    userID,
    photo,
    breed,
    age,
    description,
    gender,
  });

  try {
    const savedDog = await newDog.save();
    res.status(OKAY).json(savedDog);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//edit dog
router.put("/editDog", async (req, res) => {
  /*
  #swagger.path = '/editDog'
            #swagger.method = 'put'
            #swagger.parameters['_id'] = {
                in: 'path',
                description: 'dog ID.',
                required: true,
                type: 'String'
            }

            #swagger.parameters['doginfo'] = {
                in: 'body',
                description: 'User data.',
                required: true,
                schema: {
                  $name: 'Molly2',
                  $userID: '622edfa1c8d9ef0e2bc547c9',
                  $photo: 'new base64 String',
                  $breed: 'Husky',
                  $age: 5,
                  $description: 'about the dog description edited',
                  $gender:'Female', 
                }
            }
        */
  await admin.updateStats("putEditDog");
  const { _id, name, userID, photo, breed, age, description, gender } =
    req.body;

  try {
    await Dog.updateOne(
      { _id },
      {
        name,
        userID,
        photo,
        breed,
        age,
        description,
        gender,
      }
    );
  } catch (err) {
    throw err;
  }
});

//delete dog by Id
router.delete("/delete/:id", async (req, res) => {
  /*
   #swagger.parameters['id'] =
    { description:
      "id of the dog to be deleted"}
  */
  await admin.updateStats("deleteDog");

  const { id } = req.params;
  await Dog.deleteOne({ _id: id });
  res.status(OKAY).json({ status: "success", id });
  try {
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//get a dog by id
router.get("/:id", async (req, res) => {
  /*
   #swagger.parameters['id'] =
    { description:
      "get the dog by id"}
  */
  const { id } = req.params;
  try {
    const foundDog = await Dog.findById(id);
    res.json(foundDog);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.get("/checkUser/:id", async (req, res) => {
  /*
   #swagger.parameters['id'] =
    { description:
      "Check if the user had a dog registered or not"}
  */
  const { id } = req.params;
  try {
    const found = await Dog.findOne({ userID: id });
    if (found) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;
