import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: sessionStorage.getItem("jwtToken") || "",
    expiration: sessionStorage.getItem("jwtTokenExpiration") || null,
  });

  const saveToken = (token) => {
    sessionStorage.setItem("jwtToken", token.jwt);
    sessionStorage.setItem("jwtTokenExpiration", token.expiration);

    setAuth({ accessToken: token.jwt, expiration: token.expiration });
  };

  return (
    <AuthContext.Provider value={{ auth, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
