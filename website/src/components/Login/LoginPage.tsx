
import { useAppContext } from "../../store/appContext";
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import styles from './LoginPage.module.css';
import * as crypto from "crypto-js";

const LoginPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const endPointUrl = "http://localhost:8080";

  const encryptPassword = (password) => {
    var encryptedPassword = crypto.AES.encrypt(password, 'poodle').toString();
    setPassword(encryptedPassword);
  }

  const login = async () => {
    // console.log("my .env variable: " + process.env.REACT_APP_USER_ID);

    //FOR DECRYPTING PURPOSES
    // var bytes  = crypto.AES.decrypt(encryptedPassword, 'poodle');
    // var decryptedPassword = bytes.toString(crypto.enc.Utf8);
    // console.log("decrypted: " + decryptedPassword);

    if (!isValid(email, password)){
      return;
    }

    const response = await axios.post(endPointUrl + "/login", {
      email: email,
      password: password
    }
    ).then(response => {
      console.log(response);
      toast.success("Login successful");

      //TODO: REDIRECT TO Home Page
      
    }).catch(error => {
      toast.error(error.response.data);
    })
    
  }

  const isValid  = (email: string, password: string): boolean => {
      if (!email) {
        toast.error("Email required");
        return false;
      }

      if (!password) {
        toast.error("Password required");
        return false;
      }

      if (/\s/g.test(email)) {
        toast.error("Email must not contain white space");
        return false;
      }

      return true;
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <h1>Fetch</h1>
        <form>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel} >Email Address: </div>
            <input id="email-input" type="email" placeholder="Enter your email" name="email" onChange={ (event) => setEmail(event.target.value) }/>
          </div>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel} >Password: </div>
            <input id="password-input" type="password" placeholder="Enter your password" name="password" onChange={ (event) => encryptPassword(event.target.value) } />
          </div>
          <input className={styles.loginBtn} type="button" value="Submit" onClick={() => login() } />
        </form>
      </div>
    </div>
  )
}

export default LoginPage;