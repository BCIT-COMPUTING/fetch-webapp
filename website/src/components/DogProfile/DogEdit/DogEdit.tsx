import styles from './DogEdit.module.css';
import { useState, useEffect } from 'react';
import { editDog } from '../../../api/dogs';

const DogEdit = (props: { data: {
  setDogName: Function,
  setDogAge: Function,
  setDogBreed: Function,
  setDogDescription: Function,
  setDogGender: Function,
  setDogPhoto: Function,
  setEditDisplay: Function,
  dogId: String,
  dogName: string;
  dogPhoto: string;
  dogBreed: string;
  dogDescription: string;
  dogGender: string;
  dogAge: number; } }) => {
  const {
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
    dogAge,
  } = props.data;
  const [id, setId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editBreed, setEditBreed] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editAge, setEditAge] = useState(0);

  useEffect(() => {
    setId(dogId.toString());
    setEditName(dogName.toString());
    setEditAge(+dogAge);
    setEditBreed(dogBreed.toString());
    setEditDescription(dogDescription.toString());
    setEditPhoto(dogPhoto.toString());
    setEditGender(dogGender.toString());
  }, []);


  const handleEdit = () => {
    setDogName(editName);
    setDogAge(editAge);
    setDogBreed(editBreed);
    setDogDescription(editDescription);
    setDogGender(editGender);
    setDogPhoto(editPhoto);

    editDog(
      {
        _id: dogId,
        userID: '',
        name: editName,
        photo: editPhoto,
        breed: editBreed,
        age: editAge,
        description: editDescription,
        gender: editGender
      }
    );
    setEditDisplay(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const file = fileList[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String: String = '' + reader.result;
      // base64String.replace('data:', '')
      // .replace(/^.+,/, '');
      console.log(base64String);
      setEditPhoto(base64String.toString());
  };
  reader.readAsDataURL(file);
  };

  return (
    <div className={styles.editFormDiv}>
      <h2>Edit {dogName}</h2>
      <label htmlFor="name"
             className={`${styles.labels}`}>
            Name
      </label><br/>
      <input value={editName} onChange={(e) => setEditName(e.target.value)}
            type="text" id="name" name="name"
            className={`${styles.inputs}`}/><br/>
      <label htmlFor="photo"
            className={`${styles.labels}`}>
              Image
      </label><br/>
      <input
              accept="image/*"
              id="photo"
              name="photo"
              type="file"
              multiple={false}
              onChange={handleImageChange}
              className={`${styles.inputs}`}
            /><br />
      <label htmlFor="breed"
             className={`${styles.labels}`}>
               Breed
      </label><br/>
      <input value={editBreed} onChange={(e) => setEditBreed(e.target.value)}
             type="text" id="breed" name="breed"
             className={`${styles.inputs}`}/><br/>
      <label htmlFor="age"
             className={`${styles.labels}`}>
             Age
      </label><br/>
      <input value={editAge} onChange={(e) => setEditAge(+e.target.value)}
             type="number" id="age" name="age"
             className={`${styles.inputs}`}/><br/>
      <label htmlFor="description"
             className={`${styles.labels}`}>
             Description
      </label><br/>
      <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                id="description" name="description"
                className={`${styles.textarea}`}></textarea><br/>
      <label htmlFor="gender"
             className={`${styles.labels}`}>
             Gender
      </label><br/>
      <select value="male" onChange={(e) => setEditGender(e.target.value)}
              name="gender"
              className={styles.select}>
        <option value="none">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <div className={styles.btnDiv}>
            <button onClick={() => handleEdit()}
                    className={`${styles.btn} ${styles.funcBtn}`}>
              UPDATE
            </button>
            <button onClick={() => setEditDisplay(false)}
                    className={`${styles.btn} ${styles.funcBtn}`}>
              CANCEL
            </button>
        </div>
    </div>
  )
}

export default DogEdit;
