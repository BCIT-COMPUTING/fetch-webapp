
import { AppContext, useAppContext } from "../store/appContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from "./Test/TestPage";
import SignupPage from "./Signup/SignupPage";

function AppRouter() {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext.state}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter >
    </AppContext.Provider>
  );
}

export default AppRouter;
