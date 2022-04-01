import axios from 'axios';
import { getStorageValue } from '../store/localStorageHook';

const endPointBaseUrl = 'http://localhost:8080/dog';

interface Dog {
  id: String,
  name: String,
  photo: String,
  breed: String,
  age: number,
  description: String,
  gender: String
}

//get all dogs from database
const getAllDogs = () => {
  axios.get(`${endPointBaseUrl}/getDogs`).then(response => {
    return response.data;
  }).catch(error => console.error(error));
};

//get dog by userID
const getDogByUserID = async (id: String) => {
  const res = await axios.get(`${endPointBaseUrl}/profile/${id}`);
  const {
    _id = '',
    name = '',
    photo = '',
    breed = '',
    age = 0,
    description = '',
    gender = ''
  } = res.data || {};
  const dog = {
    id: _id,
    name,
    photo,
    breed,
    age,
    description,
    gender
  }
  return <Dog> dog;
};

//add a new dog
const addDog = (
  {
    id,
    name,
    photo,
    breed,
    age,
    description,
    gender
}: Dog) => {
  const { user: { _id }} = getStorageValue(
    'user', ''
  );
  axios.post(`${endPointBaseUrl}/addDog`, {
    name,
    userID: _id,
    photo,
    breed,
    age,
    description,
    gender
  }).then(response => {
    console.log(response.data);
  }).catch(error => console.error(error));
}

//edit dog
const editDog = ({
  id,
  name,
  photo,
  breed,
  age,
  description,
  gender
}: Dog) => {
  axios.put(`${endPointBaseUrl}/editDog`, {
    id,
    name,
    photo,
    breed,
    age,
    description,
    gender
  }).then(response => {
    console.log(response.data);
  }).catch(error => console.error(error));
}

//get dog by dogID
const getDogByID = async (id: String) => {
  const res =  await axios.get(`${endPointBaseUrl}/${id}`);
  return <Dog> res.data;
}

//delete dog by dogID
const deleteDogByID = (id: String) => {
  axios.delete(`${endPointBaseUrl}/delete/${id}`)
       .then(response => {
         console.log(response.data)})
       .catch(error => console.error(error));
};

export {
  getAllDogs,
  addDog,
  editDog,
  getDogByID,
  deleteDogByID,
  getDogByUserID
};

export type {
  Dog
}