import { useAppContext } from "../../store/appContext";
import { useState } from 'react';
import styles from './SignupPage.module.css';
import axios from "axios";
import * as crypto from "crypto-js";

const Signupage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;
  const endPointUrl = "http://localhost:8080";

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogUrl, setDogUrl] = useState('');

  const encryptPassword = (password) => {
    const realPassword = password;
    var encryptedPassword = crypto.AES.encrypt(realPassword, 'poodle').toString();
    setPassword(encryptedPassword);
  }

  const signup = async () => {
    const response = await axios.post(endPointUrl + "/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      dogName: dogName,
      dogAge: dogAge,
      dogGender: dogGender,
      dogUrl: dogUrl
    })
    console.log(response.data);
  }

  return (
    <>
      <div className={styles.signupPageContainer}>
        <div className={styles.signupContainer}>
          <h1>Fetch</h1>
          <h2>Signup</h2>
          <form>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >First Name: </div>
              <input id="first-name-input" type="text" placeholder="Enter your First Name" name="firstName" onChange={ (event) => setFirstName(document.getElementById("first-name-input").value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Last Name: </div>
              <input id="last-name-input" type="text" placeholder="Enter your Last Name" name="lastName" onChange={ (event) => setLastName(document.getElementById("last-name-input").value) } />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Email Address: </div>
              <input id="email-input" type="email" placeholder="Enter your email" name="email" onChange={ (event) => setEmail(document.getElementById("email-input").value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Password: </div>
              <input id="password-input" type="password" placeholder="Enter your password" name="password" onChange={ (event) => encryptPassword(document.getElementById("email-input").value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Name: </div>
              <input id="dog-name-input" type="text" placeholder="Enter your dog's name" name="dogName" onChange={ (event) => setDogName(document.getElementById("dog-name-input").value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Age: </div>
              <input id="dog-age-input" type="text" placeholder="Enter your dog's age" name="dogAge" onChange={ (event) => setDogAge(document.getElementById("dog-age-input").value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Gender: </div>
              <select name="dogGender" id="dog-gender-input" onChange={ (event) => setDogGender(document.getElementById("dog-gender-input").value) }>
                <option defaultValue=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Picture (URL): </div>
              <input id="dog-picture-input" type="text" placeholder="http://imgur...etc" name="dogPicture" onChange={ (event) => setDogUrl(document.getElementById("dog-picture-input").value) }/>
            </div>
            <input className={styles.signupBtn} type="button" value="Signup" onClick={() => signup()}/>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signupage;