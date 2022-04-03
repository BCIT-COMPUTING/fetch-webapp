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
          navigate("/dogSignUp");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server down");
      });
  };

  return (
    <>
      <div className={styles.containerDiv}>
        <h2 className={styles.title}>Sign Up!</h2>
        <label className={styles.labels} htmlFor="firstName">
          First Name
        </label>
        <br />
        <input
          id="firstName"
          className={styles.inputs}
          type="text"
          placeholder="Enter your First Name"
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label className={styles.labels} htmlFor="lastName">
          Last Name
        </label>
        <br />
        <input
          id="last-name-input"
          className={styles.inputs}
          type="text"
          placeholder="Enter your Last Name"
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
        />
        <label className={styles.labels} htmlFor="email">
          Email
        </label>
        <br />
        <input
          id="email"
          type="text"
          className={styles.inputs}
          placeholder="Enter your Email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />
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

        <button
          className={styles.btn}
          type="button"
          value="Signup"
          onClick={signup}
        >
          Let's go!
        </button>
      </div>
    </>
  );
};

export default SignupPage;
