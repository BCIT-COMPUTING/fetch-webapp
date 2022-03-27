import { useAppStore } from "../../store/appContext";
import { useState } from "react";
import styles from "./SignupPage.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../appConfigs";

const SignupPage = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const signup = async () => {
    if (!isValid(username, password)) {
      return;
    }

    const res = await publicRequest
      .post("/auth/register", {
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          console.log(response.data);
          setUser({
            jwt: response.data.accessToken,
            isLoggedIn: true,
            user: response.data,
          });
          toast.success("Signup successful");
          navigate("/dogInfo");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server down");
      });
  };

  return (
    <>
      <div className={styles.signupPageContainer}>
        <div className={styles.signupContainer}>
          <h1>Fetch</h1>
          <h2>Signup</h2>
          <form>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel}>First Name: </div>
              <input
                id="first-name-input"
                type="text"
                placeholder="Enter your First Name"
                name="firstName"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel}>Last Name: </div>
              <input
                id="last-name-input"
                type="text"
                placeholder="Enter your Last Name"
                name="lastName"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel}>Email Address: </div>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel}>Username: </div>
              <input
                id="username-input"
                type="text"
                placeholder="Enter your Username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className={styles.labelSection}>
              <div className={styles.signupLabel}>Password: </div>
              <input
                id="password-input"
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              className={styles.signupBtn}
              type="button"
              value="Signup"
              onClick={signup}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
