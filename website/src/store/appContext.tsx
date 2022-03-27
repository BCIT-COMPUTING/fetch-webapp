import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getStorageValue } from "./localStorageHook";

// export const initState = {
//   isLoggedIn: false,
// };

export const userState = {
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
};

interface AppContextType {
  user: typeof userState;
  setUser: React.Dispatch<React.SetStateAction<typeof userState>>;
}

const AppContext = createContext<any>(userState);
const storageKey = "user";

export const ContextProvider = (props: { children: any }) => {
  const [user, setUser] = useState(userState);
  const [userJWT, setJWT] = useState(() => {
    return getStorageValue(storageKey, null);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(storageKey, JSON.stringify(user));
  }, [storageKey, user]);

  const appContext = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const adminContext = useContext<AppContextType>(AppContext);
  if (!adminContext) {
    throw new Error("useContext must be used within the AppContext.Provider");
  }
  return adminContext;
};
