import axios from "axios";
import { getStorageValue } from "../store/localStorageHook";

const endPointBaseUrl = "http://localhost:8080/dog";

interface Dog {
  _id: String;
  name: String;
  photo: string;
  breed: String;
  age: number;
  description: String;
  gender: String;
}

const getAllDogs = async () => {
  const res = await axios.get(`${endPointBaseUrl}/getDogs`);
  return <Array<Dog>> res.data;
};

//get dog by userID
const getDogByUserID = async (id: String) => {
  const res = await axios.get(`${endPointBaseUrl}/profile/${id}`);
  const {
    _id = "",
    name = "",
    photo = "",
    breed = "",
    age = 0,
    description = "",
    gender = "",
  } = res.data || {};
  const dog = {
    _id,
    name,
    photo,
    breed,
    age,
    description,
    gender,
  };
  return <Dog>dog;
};

//add a new dog
const addDog = ({ name, photo, breed, age, description, gender }: Dog) => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  axios
    .post(`${endPointBaseUrl}/addDog`, {
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
  photo,
  breed,
  age,
  description,
  gender,
}: Dog) => {
  axios
    .put(`${endPointBaseUrl}/editDog`, {
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
  const res = await axios.get(`${endPointBaseUrl}/${id}`);
  return <Dog>res.data;
};

//delete dog by dogID
const deleteDogByID = (id: String) => {
  axios
    .delete(`${endPointBaseUrl}/delete/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

const checkDogTableExsist = async (_id: string) => {
  const res = await axios.get(`${endPointBaseUrl}/checkUser/${_id}`);
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
  checkDogTableExsist,
};

export type { Dog };
