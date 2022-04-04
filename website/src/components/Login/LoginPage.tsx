import { useAppStore } from "../../store/appContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { publicRequest, updateToken } from "../../appConfigs";

const LoginPage = () => {
  const { user, setUser } = useAppStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) navigate("/main");
  }, []);

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
          setUser({
            jwt: response.data.accessToken,
            isLoggedIn: true,
            user: response.data,
          });
          updateToken(response.data.accessToken);
          toast.success("admin Login successful");
          navigate("/admin");
        } else if (response.status === 200 && response.data.isAdmin === false) {
          setUser({
            jwt: response.data.accessToken,
            isLoggedIn: true,
            user: response.data,
          });
          updateToken(response.data.accessToken);
          toast.success("user Login successful");
          navigate("/main");
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <div className={styles.containerDiv}>
        <h2 className={styles.title}>Login</h2>
        <label className={styles.labels} htmlFor="username">
          Username
        </label>
        <br />
        <input
          id="username"
          className={styles.inputs}
          type="text"
          placeholder="Enter your Email"
          name="email"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className={styles.labels} htmlFor="password">
          Password
        </label>
        <br />

        <input
          id="password"
          type="password"
          className={styles.inputs}
          placeholder="Enter your password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={styles.btn} type="button" onClick={handleClick}>
          Go!
        </button>
      </div>
    </>
  );
};

export default LoginPage;
