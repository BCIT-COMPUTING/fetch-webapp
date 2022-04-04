
import styles from "./Nav.module.css";
import { useAppStore } from "../../store/appContext";
import { Link } from "react-router-dom";

const Nav = () => {
  const { user } = useAppStore();

  return (
    // hamburger menu for mobile
    <nav className={styles.nav}>
      <input type="checkbox" id="checkMenu" className={styles.menu} />
      <label htmlFor="checkMenu" className={styles.menuIcon}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
      </label>
      {/* menu list */}
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.a} id="home" to="/main">
            Home
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} id="profile" to={`/dog-profile/${user.user._id}`}>
            Profile
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} id="match" to="/match">
            Matches
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} id="logout" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
