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
import MatchesPage from "./Matches/MatchesPage";
import Navbar from "./Nav/Nav";
import Logout from "./Logout/Logout";
import { useEffect } from "react";
import { getStorageValue } from "../store/localStorageHook";
import Temp from "./DogInfo/temp";

function AppRouter() {
  const { user, setUser } = useAppStore();

  const validate = async () => {
    if (!(await hasValidJWT(user))) {
      setUser({ ...user, isLoggedIn: false });
    }
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <>
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
          <Route path="/temp" element={<Temp />} />
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
                <AdminPage />
              ) : (
                // Probably need unauth page here
                <LoginPage />
              )
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
