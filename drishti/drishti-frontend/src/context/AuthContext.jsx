import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("drishti_user") || null
  );

  const login = (username) => {
    setUser(username);
    localStorage.setItem("drishti_user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("drishti_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
