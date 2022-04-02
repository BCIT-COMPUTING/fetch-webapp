import { useState, useEffect } from "react";

export const getStorageValue = (key: any, defaultValue: any) => {
  // getting stored value
  const initUser = {
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
  const saved = localStorage.getItem(key) ?? "";

  if (saved == "") {
    localStorage.setItem("user", JSON.stringify(initUser));
    return initUser;
  } else {
    const savedUser = JSON.parse(saved);
    return savedUser;
  }
};

export const useLocalStorage = (key: any, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
