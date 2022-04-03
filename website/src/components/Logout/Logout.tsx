import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appContext";
import styles from "./Logout.module.css";
const Logout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  useEffect(() => {
    console.log(user);
    setUser({
      jwt: "",
      isLoggedIn: false,
      user: {
        accessToken: "",
        createdAt: "",
        email: "",
        firstname: "",
        isAdmin: false,
        lastname: "",
        updatedAt: "",
        username: "",
      },
    });
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Have a Woof Day!</h3>
        <button className={styles.btn} onClick={handleClick}>
          Back to Login
        </button>
      </div>
    </>
  );
};

export default Logout;
