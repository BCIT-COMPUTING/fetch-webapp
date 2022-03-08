
import { useAppContext } from "../../store/appContext";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import styles from './LoginPage.module.css';

const LoginPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;

  async function login () {
    const email = (document.getElementById("email-input") as HTMLInputElement).value;
    const password = (document.getElementById("password-input") as HTMLInputElement).value;
    checkCredentials(email, password);

    const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password
      }
    ).then(response => {
      // localStorage.setItem("jwtoken", response.data);
      console.log(response);
      toast.success("Login successful");
    }).catch(error => {
      toast.error(error.response.data);
    })
  }

  const checkCredentials = (email: string, password: string): void => {
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