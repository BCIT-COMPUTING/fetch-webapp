import { ContextProvider, useAppStore } from "../store/appContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hasValidJWT } from "../utils/authUtils";

import HomePage from "./Home/HomePage";
import SignupPage from "./Signup/SignupPage";
import LoginPage from "./Login/LoginPage";
import DogInfoPage from "./DogInfo/DogInfoPage";
import AdminPage from "./Admin/AdminPage";
import Navbar from "./Nav/Nav";
import Logout from "./Logout/Logout";
import { useEffect } from "react";
import { getStorageValue } from "../store/localStorageHook";

function AppRouter() {
  // const { userJWT, setJWT } = useAppStore();
  const { user, setUser } = useAppStore();

  const validate = async () => {
    if (await hasValidJWT(user)) {
      const user = getStorageValue("user", {});
      console.log(user);
      const myjson = JSON.parse(user);
      console.log(user);
      console.log(user.jwt);
      setUser({ ...user, jwt: localStorage.getItem("user") ?? "" });
    } else {
      setUser({ ...user, jwt: "" });
    }
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <ContextProvider>
      <ToastContainer
        draggable={false}
        pauseOnHover={false}
        autoClose={3000}
        position="bottom-right"
      />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={user.isLoggedIn ? <DogInfoPage /> : <SignupPage />}
          />
          <Route
            path="/login"
            element={user.isLoggedIn ? <DogInfoPage /> : <LoginPage />}
          />
          <Route path="/dogInfo" element={<DogInfoPage />} />
          <Route
            path="/admin"
            element={
              user.isLoggedIn && user.user.isAdmin ? (
                <DogInfoPage />
              ) : (
                <AdminPage />
              )
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default AppRouter;
