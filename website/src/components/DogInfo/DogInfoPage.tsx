import styles from './DogInfoPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Dog } from '../../api/dogs';
import DogCard from'../Shared/DogCard';

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
      <h2 className={styles.name}>{name}</h2>
      {
        (name !== '') ? 
        <DogCard data = { 
          { dogName: name,
            dogPhoto: photo,
            dogBreed: breed,
            dogDescription: description,
            dogGender: gender,
            dogAge: age
          }
        } /> :
        ''
      }
    </div>
  );
};

export default DogInfoPage;
