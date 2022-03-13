import { useAppContext } from "../../store/appContext";
import { useState } from 'react';
import styles from './SignupPage.module.css';
import axios from "axios";
import * as crypto from "crypto-js";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signupage = () => {
  
  const navigate = useNavigate();

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;
  const endPointUrl = "https://fetch-be.azurewebsites.net";

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogUrl, setDogUrl] = useState('');

  const encryptPassword = (pw: string): void => {
    setPassword(crypto.SHA256(pw).toString());
  }

  const isValid  = (username: string, password: string): boolean => {
    if (!username) {
      toast.error("Username required");
      return false;
    }
    if (!password || document.getElementById("password-input").value == "") {
      toast.error("Password required");
      return false;
    }
    if (/\s/g.test(username)) {
      toast.error("Username must not contain white space");
      return false;
    }
    return true;
  }

  const signup = async () => {
    if (!isValid(username, password)){
      return;
    }
    
    const response = await axios.post(endPointUrl + "/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      dogName: dogName,
      dogAge: dogAge,
      dogGender: dogGender,
      dogUrl: dogUrl
    }
    ).then(response => {
      if (response.status == 200) {
        toast.success("Signup successful");
        navigate("/login");
      }
    }).catch(error => {
      toast.error(error.response.data);
    })
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
              <input id="first-name-input" type="text" placeholder="Enter your First Name" name="firstName" onChange={ (event) => setFirstName(event.target.value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Last Name: </div>
              <input id="last-name-input" type="text" placeholder="Enter your Last Name" name="lastName" onChange={ (event) => setLastName(event.target.value) } />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Email Address: </div>
              <input id="email-input" type="email" placeholder="Enter your email" name="email" onChange={ (event) => setEmail(event.target.value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Username: </div>
              <input id="username-input" type="text" placeholder="Enter your Username" name="username" onChange={ (event) => setUsername(event.target.value) } />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Password: </div>
              <input id="password-input" type="password" placeholder="Enter your password" name="password" onChange={ (event) => encryptPassword(event.target.value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Name: </div>
              <input id="dog-name-input" type="text" placeholder="Enter your dog's name" name="dogName" onChange={ (event) => setDogName(event.target.value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Age: </div>
              <input id="dog-age-input" type="text" placeholder="Enter your dog's age" name="dogAge" onChange={ (event) => setDogAge(event.target.value) }/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Gender: </div>
              <select name="dogGender" id="dog-gender-input" onChange={ (event) => setDogGender(event.target.value) }>
                <option defaultValue=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Picture (URL): </div>
              <input id="dog-picture-input" type="text" placeholder="http://imgur...etc" name="dogPicture" onChange={ (event) => setDogUrl(event.target.value) }/>
            </div>
            <input className={styles.signupBtn} type="button" value="Signup" onClick={() => signup()}/>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signupage;