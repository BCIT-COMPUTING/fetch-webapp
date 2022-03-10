
import { AppContext, useAppContext } from "../store/appContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TestPage from "./Test/TestPage";
import HomePage from "./Home/HomePage";
import SignupPage from "./Signup/SignupPage";
import LoginPage from "./Login/LoginPage";
import DogInfoPage from "./DogInfo/DogInfoPage";

function AppRouter() {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext.state}>
      <ToastContainer draggable={false} pauseOnHover={false} autoClose={3000} position="bottom-right"/>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dogInfo" element={<DogInfoPage />} />
        </Routes>
      </BrowserRouter >
    </AppContext.Provider>
  );
}

export default AppRouter;
