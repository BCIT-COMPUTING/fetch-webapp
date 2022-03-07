
import { AppContext, useAppContext } from "../store/appContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from "./Test/TestPage";

function AppRouter() {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext.state}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter >
    </AppContext.Provider>
  );
}

export default AppRouter;
