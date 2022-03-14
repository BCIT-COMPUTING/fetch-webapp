
import { createContext, useContext, useMemo, useState } from "react";


export const initState = {
  // add your fields to use in the app
  isLoggedIn: false,
  isAdmin: false
};

interface AppContextType {
  state: typeof initState;
  setState: React.Dispatch<React.SetStateAction<typeof initState>>;
};

const AppContext = createContext<any>(initState);


export const ContextProvider = (props: { children: any }) => {
  const [state, setState] = useState(initState);

  const appContext = useMemo(() => ({
    state, setState
  }), [state])

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
}



export const useAppStore = () => {
  const adminContext = useContext<AppContextType>(AppContext);
  if (!adminContext) {
    throw new Error('useContext must be used within the AppContext.Provider');
  }
  return adminContext;
}
