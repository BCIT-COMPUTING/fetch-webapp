import { useAppStore } from "../../store/appContext";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { state, setState } = useAppStore();
  // const { isLoggedIn } = state;

  return (
    <>
      <div className={styles.homePageContainer}>
        <div className={styles.homeContainer}>
          <h1>Fetch</h1>
          <form>
            <Link to="/login">
              <input className={styles.homeBtn} type="button" value="Login" />
            </Link>
            <Link to="/signup">
              <input className={styles.homeBtn} type="button" value="Sign Up" />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
