
import { ContextProvider } from "../store/appContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./Home/HomePage";
import SignupPage from "./Signup/SignupPage";
import LoginPage from "./Login/LoginPage";
import DogInfoPage from "./DogInfo/DogInfoPage";
import AdminPage from "./Admin/AdminPage";

function AppRouter() {

  return (
    <ContextProvider>
      <ToastContainer draggable={false} pauseOnHover={false} autoClose={3000} position="bottom-right"/>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dog-info" element={<DogInfoPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter >
    </ContextProvider>
  );
}

export default AppRouter;
