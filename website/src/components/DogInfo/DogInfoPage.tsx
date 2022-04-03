import styles from './DogInfoPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Dog } from '../../api/dogs';

const DogInfoPage = () => {
  const location = useLocation();
  const state = location.state as Dog;
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
      const dog = state;
      setName(dog.name.toString());
      setPhoto(dog.photo.toString());
      setBreed(dog.breed.toString());
      setDescription(dog.description.toString());
      setGender(dog.gender.toString());
      setAge(dog.age);
  }, []);

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/main")} className={styles.btn}>
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
