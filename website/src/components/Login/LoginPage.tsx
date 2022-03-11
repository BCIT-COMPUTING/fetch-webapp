
import { useAppContext } from "../../store/appContext";
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import styles from './LoginPage.module.css';
import * as crypto from "crypto-js";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const endPointUrl = "http://localhost:8080";

  const encryptPassword = (pw: string): void => {
    if (pw == "") {
      setPassword("");
      return;
    }
    setPassword(crypto.SHA256(pw).toString());
  }

  const login = async () => {
    // console.log("my .env variable: " + process.env.REACT_APP_USER_ID);

    //FOR DECRYPTING PURPOSES
    // var bytes  = crypto.AES.decrypt(encryptedPassword, 'poodle');
    // var decryptedPassword = bytes.toString(crypto.enc.Utf8);
    // console.log("decrypted: " + decryptedPassword);

    if (!isValid(username, password)){
      return;
    }

    const response = await axios.post(endPointUrl + "/login", {
      username: username,
      password: password
    }
    ).then(response => {
      if (response.status == 200) {
        toast.success("Login successful");
        navigate("/dogInfo");
      }
    }).catch(error => {
      toast.error(error.response.data);
    })
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

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <h1>Fetch</h1>
        <form>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel} >Username: </div>
            <input id="username-input" type="text" placeholder="Enter your Username" name="username" onChange={ (event) => setUsername(event.target.value) }/>
          </div>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel} >Password: </div>
            <input id="password-input" type="password" placeholder="Enter your password" name="password" onChange={ (event) => encryptPassword(event.target.value) } />
          </div>
          <input className={styles.loginBtn} type="button" value="Login" onClick={() => login() } />
        </form>
      </div>
    </div>
  )
}

export default LoginPage;