import axios from 'axios';

const endPointBaseUrl = "http://localhost:8080/dog";

interface Dog {
  id: String,
  name: String,
  photo: String,
  breed: String,
  age: number,
  description: String,
  gender: String,
}

const getAllDogs = async () => {
  const res = await axios.get(endPointBaseUrl + "/getDogs");
  return <Array<Dog>>res.data;
};

const addEditDog = ({
  id,
  name,
  photo,
  breed,
  age,
  description,
  gender
}: Dog) => {
  axios.post(endPointBaseUrl + "/addEditDog", {
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
};

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
  addEditDog,
  getDogByID,
  deleteDogByID
};

export type {
  Dog
}