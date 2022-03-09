
import { useAppContext } from "../../store/appContext";
import styles from './SignupPage.module.css';

const Signupage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;

  return (
    <>
      <div className={styles.signupPageContainer}>
        <div className={styles.signupContainer}>
          <h1>Fetch</h1>
          <h2>Signup</h2>
          <form>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >First Name: </div>
              <input id="first-name-input" type="text" placeholder="Enter your First Name" name="firstName" />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Last Name: </div>
              <input id="last-name-input" type="text" placeholder="Enter your Last Name" name="lastName" autoComplete="off" />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Email Address: </div>
              <input id="email-input" type="email" placeholder="Enter your email" name="email" autoComplete="off"/>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Password: </div>
              <input id="password-input" type="password" placeholder="Enter your password" name="password" />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Name: </div>
              <input id="dog-name-input" type="text" placeholder="Enter your dog's name" name="dogName" />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Age: </div>
              <input id="dog-age-input" type="text" placeholder="Enter your dog's age" name="dogAge" />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Gender: </div>
              <select name="dogGender" id="dog-gender-input">
                <option value="" selected></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel} >Dog Picture (URL): </div>
              <input id="dog-picture-input" type="text" placeholder="http://imgur...etc" name="dogPicture" />
            </div>
            <input className={styles.signupBtn} type="button" value="Signup" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Signupage;