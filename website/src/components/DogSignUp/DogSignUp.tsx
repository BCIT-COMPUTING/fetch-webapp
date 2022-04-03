import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { addDog, checkDogTableExsist } from "../../api/dogs";
import styles from "./DogSignUp.module.css";
import { toast } from "react-toastify";
import { getStorageValue } from "../../store/localStorageHook";
const MB_Size = 1024 * 1024;
const DogSignUp = () => {
  const navigate = useNavigate();
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("none");

  useEffect(() => {
    const {
      user: { _id },
    } = getStorageValue("user", "");
    (async () => {
      const checkTable = await checkDogTableExsist(_id);
      if (checkTable) {
        navigate("/dog-info");
      }
    })();
  }, []);

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
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String: String = "" + reader.result;
      setPhoto(base64String.toString());
    };
    reader.readAsDataURL(file);
  };

  const form = () => (
    <div className={styles.containerDiv}>
      <h2 className={styles.title}>Dog's SignUp - Use your PAWS!</h2>
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
      {selectedFile !== null && (
        <>
          <img
            src={URL.createObjectURL(selectedFile)}
            className="image"
            height="215px"
            width="215px"
          />
        </>
      )}
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
        className={styles.dogAge}
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
        <button className={styles.btn} onClick={handleAdd}>
          ADD
        </button>
      </div>
    </div>
  );

  const handleAdd = () => {
    const addDogRes = addDog({
      _id,
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
