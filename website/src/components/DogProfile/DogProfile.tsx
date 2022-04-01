import styles from "./DogProfile.module.css";
import { useState, useEffect } from "react";
import { getDogByUserID, deleteDogByID } from "../../api/dogs";
import { getStorageValue } from '../../store/localStorageHook';
import { useNavigate } from 'react-router-dom';
import DogCard from'../Shared/DogCard';
import DogEdit from './DogEdit/DogEdit';

const DogProfile = () => {
  const [dogId, setDogId] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogPhoto, setDogPhoto] = useState('');
  const [dogDescription, setDogDescription] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogAge, setDogAge] = useState(0);
  const [confirmDisplay, setConfirmDisplay] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDogByID(dogId);
    //TODO navigate to dog sign in
    navigate('/temp');
  };

  const displayConfirmDelete = () =>
  <div className={styles.confirmDiv}>
    <p>Are you sure?</p>
    <div className={styles.btnDiv}>
      <button onClick={() => handleDelete() }
              className={`${styles.btn} ${styles.funcBtn}`}>
        Delete
      </button>
      <button onClick={() => setConfirmDisplay(false)}
              className={`${styles.btn} ${styles.funcBtn}`}>
        Cancel
      </button>
    </div>
  </div>;
  
  useEffect(() => {
    (async () => {
      const { user: { _id } } = getStorageValue(
        'user', ''
      );
      const {
        id,
        name,
        age,
        photo,
        description,
        breed,
        gender
      } = await getDogByUserID(_id);
      if(id === '') {
        console.log('navigate to dog sign in');
        //TODO navigate to dog sign in
        //navigate('/dog-signin');
      }
      setDogId(id.toString());
      setDogName(name.toString());
      setDogAge(+age);
      setDogBreed(breed.toString());
      setDogDescription(description.toString());
      setDogPhoto(photo.toString());
      setDogGender(gender.toString());
    })();
  }, []);

  return (
    <>
      <div className={styles.container}>
         <div>
            <h1>{dogName} Profile</h1>
            <div className={`${styles.btnDiv}`}>
              <button onClick={() => setEditDisplay(true)}
                      className={`${styles.btn} ${styles.editDeleteBtn}`}>
                        Edit
              </button>
              <button onClick={() => setConfirmDisplay(true)}
                      className={`${styles.btn} ${styles.editDeleteBtn}`}>
                        Delete
              </button>
            </div>
         </div>
      {
        (confirmDisplay) ? displayConfirmDelete() : ''
      }
      {
        (editDisplay) ? 
        <div>
          <DogEdit data={
            { 
              setDogName,
              setDogAge,
              setDogBreed,
              setDogDescription,
              setDogGender,
              setDogPhoto,
              setEditDisplay,
              dogId,
              dogName,
              dogPhoto,
              dogBreed,
              dogDescription,
              dogGender,
              dogAge}
            } />
        </div>
         : ''
      }
       <DogCard data = { 
          { dogName, 
            dogPhoto,
            dogBreed,
            dogDescription,
            dogGender,
            dogAge
          }
        }/>
    </div>
    </>
  );
};

export default DogProfile;