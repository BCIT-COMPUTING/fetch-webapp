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
    <div className={styles.pageContainer}>
      <div className={styles.container}>
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
        <button onClick={() => navigate("/match")} className={styles.btn}>
          Back
        </button>
      </div>
    </div>
  );
};

export default DogInfoPage;
