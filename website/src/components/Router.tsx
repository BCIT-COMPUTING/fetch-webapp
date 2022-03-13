import { AppContext, useAppContext } from "../store/appContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TestPage from "./Test/TestPage";
import HomePage from "./Home/HomePage";
import SignupPage from "./Signup/SignupPage";
import LoginPage from "./Login/LoginPage";
import DogInfoPage from "./DogInfo/DogInfoPage";
import AdminPage from "./Admin/AdminPage";

function AppRouter() {
  const appContext = useAppContext();
  const admin = appContext.state.isAdmin;
  const isloggedIn = appContext.state.isLoggedIn;

  return (
    <AppContext.Provider value={appContext.state}>
      <ToastContainer
        draggable={false}
        pauseOnHover={false}
        autoClose={3000}
        position="bottom-right"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={isloggedIn ? <HomePage /> : <LoginPage />} />
          <Route
            path="/signup"
            element={isloggedIn ? <Navigate replace to="/" /> : <SignupPage />}
          />
          <Route
            path="/login"
            element={isloggedIn ? <Navigate replace to="/" /> : <LoginPage />}
          />
          <Route
            path="/dogInfo"
            element={isloggedIn ? <DogInfoPage /> : <LoginPage />}
          />
          <Route
            path="/admin"
            element={admin && isloggedIn ? <AdminPage /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default AppRouter;
