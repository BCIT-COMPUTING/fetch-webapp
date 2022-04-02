import styles from './DogInfoPage.module.css';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appContext';
//import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import { getDogByID } from '../../api/dogs';
import type { Dog } from '../../api/dogs';

const DogInfoPage = () => {
  const { user, setUser } = useAppStore();
  //let data = useLocation();
  //testing the id 623e05239456782e58dcb18d need to setID later passing from previous page
  const [id, setID] = useState('624778d0d8fe7c1b03cab1f2');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // if (state.isLoggedIn === false) {
    //   navigate("/login");
    //   return;
    // }
    (async () => {
      const result: Dog = await getDogByID(id);
      const { name, photo, gender, description, age, breed } = result;
      setName(name.toString());
      setPhoto(photo.toString());
      setBreed(breed.toString());
      setDescription(description.toString());
      setGender(gender.toString());
      setAge(age);
    })();
  }, []);

  return (
    <div className={styles.container}>
      {/* TODO change the link to the previous page */}
      <button onClick={() => navigate("/")} className={styles.btn}>
        Back
      </button>
      <div className={styles.dogInfo}>
        <h2 className={styles.name}>{name}</h2>
        <img className={styles.dogImg} src={photo} alt="dog image" />
        <h2 className={styles.title}>Breed</h2>
        <p className={styles.info}>{breed}</p>
        <h2 className={styles.title}>Description</h2>
        <p className={styles.info}>{description}</p>
        <h2 className={styles.title}>
          Gender: <span className={styles.info}>{gender}</span>
        </h2>
        <h2 className={styles.title}>
          Age: <span className={styles.info}>{age} years old</span>
        </h2>
      </div>
    </div>
  );
};

export default DogInfoPage;
