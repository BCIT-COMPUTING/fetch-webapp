
import { AppContext, useAppContext } from "../store/appContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TestPage from "./Test/TestPage";
import LoginPage from "./Login/LoginPage";

function AppRouter() {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext.state}>
      <ToastContainer draggable={false} pauseOnHover={false} autoClose={3000} position="bottom-right"/>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter >
    </AppContext.Provider>
  );
}

export default AppRouter;
