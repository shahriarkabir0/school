import { createContext, useState, useEffect } from "react";
import fetchProfile from "../utils/fetchProfile";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await fetchProfile();
        setUser(profile);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
