import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: sessionStorage.getItem("jwtToken") || "",
    expiration: sessionStorage.getItem("jwtTokenExpiration") || null,
    role: sessionStorage.getItem("userRole") || "",
    currentUserId: sessionStorage.getItem("userId") || "",
  });

  const saveToken = (token) => {
    sessionStorage.setItem("jwtToken", token.jwt);
    sessionStorage.setItem("jwtTokenExpiration", token.expiration);
    sessionStorage.setItem("userRole", token.role);
    sessionStorage.setItem("userId", token.id);

    setAuth({
      accessToken: token.jwt,
      expiration: token.expiration,
      role: token.role,
      currentUserId: token.id,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
