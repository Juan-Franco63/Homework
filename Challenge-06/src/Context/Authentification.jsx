import { createContext, useContext, useState } from "react";

const Authentification = createContext();

export const useAuth = () => useContext(Authentification);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Authentification.Provider value={{ user, login, logout }}>
      {children}
    </Authentification.Provider>
  );
};
