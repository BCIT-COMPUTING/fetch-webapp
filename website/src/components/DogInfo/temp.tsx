import { 
  getAllDogs,
  addDog,
  editDog,
  deleteDogByID,
  getDogByID} from '../../api/dogs';
import {
  addLikeToMatch,
  addDislikeToMatch,
  getMatchByUserId,
  addMatch,
  getAllLikesByEveryOne
} from '../../api/match';

import React, { useState, useEffect } from 'react';

const Temp = () => {
  const [id, setId] = useState('');
  //add dog and edit
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [likes, setLikes] = useState([]);
  const [userID, setUserID] = useState('');

  //Match
  const [likeDog, setLikeDog] = useState('');
  const [disLikeDog, setDislikeDog] = useState('');

  useEffect(() => {
    //get all dogs
    // setUserID();
    (async() => {
      const {likes, dislikes} = await getMatchByUserId();
      const allLikes = await getAllLikesByEveryOne();
      console.log({allLikes});
    })();
    console.log(getAllDogs());
  }, []);

  //this is for convert image
  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    const file = fileList[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String: String = '' + reader.result;
      // base64String.replace('data:', '')
      // .replace(/^.+,/, '');

      setPhoto(base64String.toString());
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
  };
  reader.readAsDataURL(file);
  };

  const form = () =>
  <div>
     <label htmlFor="name">Name</label><br/>
    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name"/><br/>
    <label htmlFor="photo">Image</label><br/>
    <input
            accept="image/*"
            id="photo"
            name="photo"
            type="file"
            multiple={false}
            onChange={handleImageChange}
          /><br />
    <label htmlFor='breed'>Breed</label><br/>
    <input value={breed} onChange={(e) => setBreed(e.target.value)} type="text" id="breed" name="breed"/><br/>
    <label htmlFor='age'>age</label><br/>
    <input value={age} onChange={(e) => setAge(+e.target.value)} type="number" id="age" name="age"/><br/>
    <label htmlFor='description'>description</label><br/>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description"></textarea><br/>
    <label htmlFor='gender'>gender</label><br/>
    <select value="male" onChange={(e) => setGender(e.target.value)} name="gender">
      <option value="none">Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>;

  const setField = async (id: String) => {
    const dog = await getDogByID(id);
    const {
      name,
      gender,
      photo,
      description,
      age,
      breed
    } = dog;
    setName(name.toString());
    setPhoto(photo.toString());
    setBreed(breed.toString());
    setDescription(description.toString());
    setGender(gender.toString());
    setAge(age);
  };
  

  return (
    <>
    {/* add Match */}
    <div style={{margin: "5%"}}>
      <button onClick={() => addMatch()}>ADD Match</button>
    </div>
    {/* testing for Match add likes*/}
    <div style={{margin: "5%"}}>
      <h2>Add likes</h2>
      <input onChange={(e) => setLikeDog(e.target.value)} name="dogId"></input>
      <button onClick={() => addLikeToMatch(likeDog)}>Add</button>
    </div>
    {/* testing for Match add dislikes*/}
    <div style={{margin: "5%"}}>
      <h2>Add disLikes</h2>
      <input onChange={(e) => setDislikeDog(e.target.value)} name="dogId"></input>
      <button onClick={() => addDislikeToMatch(disLikeDog)}>Add</button>
    </div>
    {/* testing add dog function */}
      <div style={{margin: "5%"}}>
        <h2>Add New Dog Test</h2>
        {
          form()
        }
        <button onClick={() => 
        addDog({
          _id: id,
          name,
          photo,
          breed,
          age,
          description,
          gender,
            })}>ADD</button>
      </div>

      {/* testing delete by ID function */}
      <div style={{margin: "5%"}}>
        <h2>Delete Dog by ID Test</h2>
        <input type="text" placeholder="type id here for test" onChange={(e) => setId(e.target.value)}></input>
        <button onClick={() => deleteDogByID(id)}>Delete</button>
      </div>

      {/* testing edit by ID function */}
      <div style={{margin: "5%"}}>
        <h2>Edit dog by ID Test</h2>
        <label htmlFor='id'>Edit Dog ID</label><br/>
        <input type="text" name="id" placeholder="type id here for test" onChange={(e) => setId(e.target.value)}></input>
        <button onClick={() => setField(id)}>Edit</button>
        {form()}
        <button onClick={() => editDog(
          {
            _id: id,
            name,
            photo,
            breed,
            age,
            description,
            gender
          }
        )}>Save</button>
      </div>
    </>
  );
}


export default Temp;

