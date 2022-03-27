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
      ...user,
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
    navigate("/login");
  }, []);

  return <></>;
};

export default Logout;
