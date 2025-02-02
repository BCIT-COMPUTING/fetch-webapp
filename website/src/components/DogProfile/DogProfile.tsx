import styles from "./DogProfile.module.css";
import { useState, useEffect } from "react";
import { getDogByUserID, deleteDogByID } from "../../api/dogs";
import { useNavigate } from 'react-router-dom';
import DogCard from '../Shared/DogCard';
import DogEdit from './DogEdit/DogEdit';
import DogNotFound from '../DogNotFound/DogNotFound';
import { useAppStore } from "../../store/appContext";

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
  const { user, setUser } = useAppStore();

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDogByID(dogId);
    setDogId('');
    navigate('/dogSignUp');
  };

  const displayConfirmDelete = () =>
    <div className={styles.confirmDiv}>
      <p>Are you sure?</p>
      <div className={styles.btnDiv}>
        <button onClick={() => handleDelete()}
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

      const {
        _id: id,
        name,
        age,
        photo,
        description,
        breed,
        gender
      } = await getDogByUserID(user.user._id);
      if (id === null || id === '') {
        console.log('navigate to dog sign in');
        navigate('/dogSignUp');
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
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          {(dogId !== '') ?
            <div>
              <h1 className={styles.profileHeader}>Profile</h1>

            </div> : <DogNotFound />
          }
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
                    dogAge
                  }
                } />
              </div>
              : ''
          }
          {
            (dogId !== '') ?
              <DogCard data={
                {
                  dogName,
                  dogPhoto,
                  dogBreed,
                  dogDescription,
                  dogGender,
                  dogAge
                }
              } /> :
              ''
          }
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

      </div>
    </>
  );
};

export default DogProfile;