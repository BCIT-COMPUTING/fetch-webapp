import { useState } from "react";
import { useNavigate } from "react-router";
import { addDog } from "../../api/dogs";

const DogSignUp = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");

  //this is for convert image
  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    const file = fileList[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String: String = "" + reader.result;
      // base64String.replace('data:', '')
      // .replace(/^.+,/, '');

      setPhoto(base64String.toString());
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
  };

  const form = () => (
    <div>
      <label htmlFor="name">Name</label>
      <br />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
        name="name"
      />
      <br />
      <label htmlFor="photo">Image</label>
      <br />
      <input
        accept="image/*"
        id="photo"
        name="photo"
        type="file"
        multiple={false}
        onChange={handleImageChange}
      />
      <br />
      <label htmlFor="breed">Breed</label>
      <br />
      <input
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        type="text"
        id="breed"
        name="breed"
      />
      <br />
      <label htmlFor="age">age</label>
      <br />
      <input
        value={age}
        onChange={(e) => setAge(+e.target.value)}
        type="number"
        id="age"
        name="age"
      />
      <br />
      <label htmlFor="description">description</label>
      <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description"
        name="description"
      ></textarea>
      <br />
      <label htmlFor="gender">gender</label>
      <br />
      <select
        value="male"
        onChange={(e) => setGender(e.target.value)}
        name="gender"
      >
        <option value="none">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );

  const handleAdd = () => {
    const addDogRes = addDog({
      id,
      name,
      photo,
      breed,
      age,
      description,
      gender,
    });
    console.log(addDogRes);
    navigate("/dogInfo");
  };

  return (
    <div style={{ margin: "5%" }}>
      <h2>Add New Dog Test</h2>
      {form()}
      <button onClick={handleAdd}>ADD</button>
    </div>
  );
};

export default DogSignUp;
