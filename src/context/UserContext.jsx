import { createContext, use, useContext, useEffect, useState } from "react";
import { fetchUserData } from "../services/data";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return; // Skip if no user
    const loadData = async () => {
      const data = await fetchUserData(user);
      setUserData(data);
    };
    loadData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};