import { createContext, useContext, useMemo, useState } from "react";

const initState = {
  // add your fields to use in the app
  isLoggedIn: false,
  isAdmin: false,
};

export const AppContext = createContext<typeof initState>(initState);

export const useAppContext = () => {
  const [state, setState] = useState(initState);

  const appContext = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState]
  );

  return appContext;
};

/**
 *
 * @returns {(initState)} app state
 */
export const useAppStore = () => {
  const adminContext = useContext(AppContext);
  if (!adminContext) {
    throw new Error("useContext must be used within the AppContext.Provider");
  }
  return adminContext;
};
