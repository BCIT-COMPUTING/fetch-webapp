import styles from './DogInfoPage.module.css';
import React, { useState } from 'react';
import { useAppStore } from '../../store/appContext';
//import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import { DogInfo } from "./data";
import { useEffect } from "react";

const DogInfoPage = () => {
  const { state, setState } = useAppStore();
  //let data = useLocation();
  //data.state.name
  //TODO set the default data to data.state the data from prev page
  const [name, setName] = useState('Molly');
  const [dogImg, setDogImg] = useState('https://molly.izzy0404.repl.co/images/molly.png');
  const [description, setDescription] = useState('default description');
  const [gender, setGender] = useState('Female');
  const [age, setAge] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isLoggedIn === false) {
      navigate("/login");
      return;
    }
  }, []);

  return (
  <div className={styles.container}>
    {/* TODO change the link to the previous page */}
    <button onClick={() => navigate('/')} className={styles.btn}>Back</button>
        <div className={styles.dogInfo}>
          <h2 className={styles.name}>{name}</h2>
          <img className={styles.dogImg} src={dogImg} alt="dog image"/>
          <h2 className={styles.title} >Description</h2>
          <p className={styles.info}>
           {description}
          </p>
          <h2 className={styles.title}>Gender: <span className={styles.info}>{gender}</span></h2>
          <h2 className={styles.title}>Age: <span className={styles.info}>{age} years old</span></h2>
        </div>
    </div>
  );
};

export default DogInfoPage;
