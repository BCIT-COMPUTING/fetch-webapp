
import { useAppContext } from "../../store/appContext";
import { toast } from 'react-toastify';
import axios from "axios";
import styles from './LoginPage.module.css';
import * as crypto from "crypto-js";

const LoginPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;

  const endPointUrl = "http://localhost:8080";


  const login = async () => {
    const email = (document.getElementById("email-input") as HTMLInputElement).value;
    const password = (document.getElementById("password-input") as HTMLInputElement).value;
    
    // console.log("my .env variable: " + process.env.REACT_APP_USER_ID);
    // console.log("password: " + password);

    var encryptedPassword = crypto.AES.encrypt(password, 'poodle').toString();
    console.log("encrypted: " + encryptedPassword);

    // var bytes  = crypto.AES.decrypt(encryptedPassword, 'poodle');
    // var decryptedPassword = bytes.toString(crypto.enc.Utf8);
    // console.log("decrypted: " + decryptedPassword);

    checkCredentials(email, encryptedPassword);


    const response = await axios.post(endPointUrl + "/login", {
        email: email,
        password: encryptedPassword
      }
    ).then(response => {
      console.log(response);
      toast.success("Login successful");
    }).catch(error => {
      toast.error(error.response.data);
    })

  }

  const checkCredentials  = (email: string, password: string): void => {
      if (!email) {
        toast.error("Email required");
        return;
      }

      if (!password) {
        toast.error("Password required");
        return;
      }

      if (/\s/g.test(email)) {
        toast.error("Email must not contain white space");
        return;
      }
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <h1>Fetch</h1>
        <form>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel} >Email Address: </div>
            <input id="email-input" type="email" placeholder="Enter your email" name="email" />
          </div>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel} >Password: </div>
            <input id="password-input" type="password" placeholder="Enter your password" name="password" />
          </div>
          <input className={styles.loginBtn} type="button" value="Submit" onClick={() => login() } />
        </form>
      </div>
    </div>
  )
}

export default LoginPage;