import { publicRequest } from "../appConfigs";
import { getStorageValue } from "../store/localStorageHook";

const path = "/dog";

interface Dog {
  _id: String;
  userID: String;
  name: String;
  photo: string;
  breed: String;
  age: number;
  description: String;
  gender: String;
}

const getAllDogs = async (id: string) => {
  const res = await publicRequest.get(`${path}/getDogs/${id}`);
  return <Array<Dog>>res.data;
};

//get dog by userID
const getDogByUserID = async (id: String) => {
  const res = await publicRequest.get(`${path}/profile/${id}`);
  const {
    _id = "",
    name = "",
    userID = "",
    photo = "",
    breed = "",
    age = 0,
    description = "",
    gender = "",
  } = res.data || {};
  const dog = {
    _id,
    name,
    userID,
    photo,
    breed,
    age,
    description,
    gender,
  };
  return <Dog>dog;
};

//add a new dog
const addDog = ({
  userID,
  name,
  photo,
  breed,
  age,
  description,
  gender,
}: Dog) => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  publicRequest
    .post(`${path}/addDog`, {
      name,
      userID: _id,
      photo,
      breed,
      age,
      description,
      gender,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

//edit dog
const editDog = ({
  _id,
  name,
  userID,
  photo,
  breed,
  age,
  description,
  gender,
}: Dog) => {
  publicRequest
    .put(`${path}/editDog`, {
      _id,
      name,
      photo,
      breed,
      age,
      description,
      gender,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

//get dog by dogID
const getDogByID = async (id: String) => {
  const res = await publicRequest.get(`${path}/${id}`);
  return <Dog>res.data;
};

//delete dog by dogID
const deleteDogByID = (id: String) => {
  publicRequest
    .delete(`${path}/delete/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

const checkDogTableExist = async (_id: string) => {
  const res = await publicRequest.get(`${path}/checkUser/${_id}`);
  console.log(res.data.result);
  return res.data.result;
};

export {
  getAllDogs,
  addDog,
  editDog,
  getDogByID,
  deleteDogByID,
  getDogByUserID,
  checkDogTableExist,
};

export type { Dog };
