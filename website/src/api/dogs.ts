import axios from 'axios';

const endPointBaseUrl = "http://localhost:8080/dog";

interface Dog {
  name: String,
  photo: String,
  breed: String,
  age: number,
  description: String,
  gender: String,
  likes: Array<String>
}

interface User {
  user: {
    _id: String
  }
}

const getAllDogs = () => {
  axios.get(endPointBaseUrl + "/getDogs").then(response => {
    return response.data;
  }).catch(error => console.error(error));
};

const addDog = (
  {
  name,
  photo,
  breed,
  age,
  description,
  gender
}: Dog) => {
  const { user: { _id} }  =  <User> JSON.parse(localStorage.getItem('user') || '');
  console.log(_id);
  axios.post(endPointBaseUrl + "/addDog", {
    name,
    userID: _id,
    photo,
    breed,
    age,
    description,
    gender,
    likes: []
  }).then(response => {
    console.log(response.data);
  }).catch(error => console.error(error));
}

const editDog = ({
  name,
  photo,
  breed,
  age,
  description,
  gender,
  likes
}: Dog) => {
  axios.put(endPointBaseUrl + "/editDog", {
    name,
    photo,
    breed,
    age,
    description,
    gender,
    likes
  }).then(response => {
    console.log(response.data);
  }).catch(error => console.error(error));
}

// const addEditDog = ({
//   id,
//   name,
//   photo,
//   breed,
//   age,
//   description,
//   gender
// }: Dog) => {
//   axios.post(endPointBaseUrl + "/addEditDog", {
//     id,
//     name,
//     photo,
//     breed,
//     age,
//     description,
//     gender
//   }).then(response => {
//     console.log(response.data);
//   }).catch(error => console.error(error));
// };

const getDogByID = (id: String):Promise<Dog> => new Promise((res, rej) => {
  {
    axios.get(endPointBaseUrl + `/${id}`).then(response => {
      res(response.data);
    }).catch(error => console.error(error));
  };
});

const deleteDogByID = (id: String) => {
  axios.post(endPointBaseUrl + `/delete`, {
    id
  }).then(response => {
    console.log(response.data);
  }).catch(error => console.error(error));
};

export {
  getAllDogs,
  addDog,
  editDog,
  getDogByID,
  deleteDogByID
};

export type {
  Dog
}