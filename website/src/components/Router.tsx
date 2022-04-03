import { ContextProvider, useAppStore } from "../store/appContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hasValidJWT } from "../utils/authUtils";

import HomePage from "./Home/HomePage";
import SignupPage from "./Signup/SignupPage";
import LoginPage from "./Login/LoginPage";
import DogInfoPage from "./DogInfo/DogInfoPage";
import DogProfilePage from "./DogProfile/DogProfile";
import AdminPage from "./Admin/AdminPage";
import MatchesPage from "./Matches/MatchesPage";
import MainPage from "./Main/MainPage";
import Navbar from "./Nav/Nav";
import Logout from "./Logout/Logout";
import { useEffect } from "react";
import Temp from "./DogInfo/temp";
import DogSignUp from "./DogSignUp/DogSignUp";

function AppRouter() {
  const { user, setUser } = useAppStore();
  const validate = async () => {
    if (!(await hasValidJWT(user))) {
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
          <Route
            path="/main"
            element={user.isLoggedIn ? <MainPage /> : <MainPage />}
          />
          <Route path="/dog-info/:id" element={<DogInfoPage />} />
          <Route path="/dog-profile/:id" element={<DogProfilePage />} />
          <Route path="/match" element={<MatchesPage />} />
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
          <Route
            path="/dogSignUp"
            element={user.isLoggedIn ? <DogSignUp /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
