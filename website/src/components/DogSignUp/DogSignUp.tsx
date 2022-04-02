import { useState } from "react";
import { useNavigate } from "react-router";
import { addDog } from "../../api/dogs";
import styles from "./DogSignUp.module.css";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
const MB_Size = 1024 * 1024;
const DogSignUp = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("none");
  const [toggleButton, setToggleButton] = useState(false);

  //this is for convert image
  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    const file = fileList[0];
    if (file.size > MB_Size) {
      toast.error("File size cannot exceed more than 1MB");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String: String = "" + reader.result;
      setPhoto(base64String.toString());
    };
    reader.readAsDataURL(file);
  };

  const form = () => (
    <div className={styles.containerDiv}>
      <h2>Dog's SignUp - Use your PAWS!</h2>
      <label className={styles.labels} htmlFor="name">
        Name
      </label>
      <br />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
        className={styles.inputs}
        name="name"
      />
      <br />
      <label className={styles.labels} htmlFor="photo">
        Image
      </label>
      <br />
      <input
        className={styles.inputs}
        accept="image/*"
        id="photo"
        name="photo"
        type="file"
        multiple={false}
        onChange={handleImageChange}
      />
      <br />
      <label className={styles.labels} htmlFor="breed">
        Breed
      </label>
      <br />
      <input
        className={styles.inputs}
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        type="text"
        id="breed"
        name="breed"
      />
      <br />
      <label className={styles.labels} htmlFor="age">
        age
      </label>
      <br />
      <input
        value={age}
        onChange={(e) => setAge(+e.target.value)}
        type="number"
        id="age"
        name="age"
      />
      <br />
      <label className={styles.labels} htmlFor="description">
        description
      </label>
      <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description"
        className={styles.textarea}
        name="description"
      ></textarea>
      <br />
      <label className={styles.labels} htmlFor="gender">
        gender
      </label>
      <br />
      <select
        className={styles.select}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        name="gender"
      >
        <option value="none">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <div className={styles.btnDiv}>
        {!toggleButton ? (
          <button className={styles.btn} onClick={handleAdd}>
            ADD
          </button>
        ) : (
          <CircularProgress />
        )}
      </div>
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

  return <>{form()}</>;
};

export default DogSignUp;
