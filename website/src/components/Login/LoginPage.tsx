import { useAppStore } from "../../store/appContext";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import * as crypto from "crypto-js";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../appConfigs";

const LoginPage = () => {
  const { state, setState } = useAppStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValid = (username: string, password: string): boolean => {
    if (!username) {
      toast.error("Username required");
      return false;
    }
    if (password === "" || !password) {
      toast.error("Password required");
      return false;
    }
    if (/\s/g.test(username)) {
      toast.error("Username must not contain white space");
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    if (!isValid(username, password)) {
      return;
    }
    const res = await publicRequest
      .post("/auth/login", { username, password })
      .then((response) => {
        if (response.status === 200 && response.data.isAdmin === true) {
          console.log(response);
          setState({ isLoggedIn: true, user: response.data });
          console.log(state.user);
          toast.success("admin Login successful");
          navigate("/admin");
        } else if (response.status === 200 && response.data.isAdmin === false) {
          setState({ isLoggedIn: true, user: response.data });
          toast.success("user Login successful");
          navigate("/dogInfo");
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContent}>
        <h2>Login</h2>
        <form>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel}>Username: </div>
            <input
              id="username-input"
              type="text"
              placeholder="Enter your Username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className={styles.labelSection}>
            <div className={styles.loginLabel}>Password: </div>
            <input
              id="password-input"
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            className={styles.loginBtn}
            type="button"
            onClick={handleClick}
          >
            Go!
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
