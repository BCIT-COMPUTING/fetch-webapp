import styles from "./Nav.module.css";
import { useEffect, useState } from "react";
import { getStorageValue } from "../../store/localStorageHook";

const Nav = () => {
  const [userID, setUserID] = useState('');
  const { user: { _id } } = getStorageValue(
    'user', ''
  );
  useEffect(() =>
  {
    setUserID(_id);
  }, []);

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
          <a className={styles.a} id="home" href="/">
            Home
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} id="profile" href={`/dog-profile/${userID}`}>
            Profile
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} id="contact" href="/matches">
            Matches
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} id="test" href="/test">
            test
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} id="logout" href="/logout">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
