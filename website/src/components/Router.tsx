import { useAppStore } from "../store/appContext";
import { Routes, Route } from "react-router-dom";
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
import DogSignUp from "./DogSignUp/DogSignUp";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";

const nonNavBarRoutes = ["/", "login", "logout", "signup", "dogSignUp"];

function AppRouter() {
  const { user, setUser } = useAppStore();
  const { pathname } = useLocation();
  const validate = async () => {
    if (!(await hasValidJWT(user))) {
      setUser({
        jwt: "",
        isLoggedIn: false,
        user: {
          _id: "",
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

  const isNavbarPath = !nonNavBarRoutes.some((route) =>
    pathname.toLocaleLowerCase().endsWith(route)
  );

  const isBaseURL = pathname === "" || pathname === "/";
  const LoginRedirect = <Navigate replace to="/login" />;

  return (
    <>
      <ToastContainer
        draggable={false}
        pauseOnHover={false}
        autoClose={3000}
        position="bottom-right"
      />
      {isNavbarPath && !isBaseURL ? (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/main"
              element={user.isLoggedIn ? <MainPage /> : LoginRedirect}
            />
            <Route
              path="/dog-info/:id"
              element={user.isLoggedIn ? <DogInfoPage /> : LoginRedirect}
            />
            <Route
              path="/dog-profile/:id"
              element={user.isLoggedIn ? <DogProfilePage /> : LoginRedirect}
            />
            <Route
              path="/match"
              element={user.isLoggedIn ? <MatchesPage /> : LoginRedirect}
            />
            <Route
              path="/admin"
              element={
                user.isLoggedIn && user.user.isAdmin ? (
                  <AdminPage />
                ) : (
                  LoginRedirect
                )
              }
            />
            <Route
              path="/dogSignUp"
              element={user.isLoggedIn ? <DogSignUp /> : LoginRedirect}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Routes>
      )}
    </>
  );
}

export default AppRouter;
