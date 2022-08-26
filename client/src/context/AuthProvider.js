import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const {children} =props;
  const [auth, setAuth] = useState({
    ROLE: [""],
    ACCESS_TOKEN: "",
    STATUS: false,
    EMAIL: "",
  });
  useEffect(() => {
    if (localStorage.getItem("user-auth")) {
      console.log("found");
      let tempAuth = JSON.parse(localStorage.getItem("user-auth"));
      setAuth(tempAuth);
    } else {
      console.log("not found");
    }
  }, []);
  // const [auth, setAuth] = useState({
  //   ROLE: [""],
  //   ACCESS_TOKEN: "",
  //   STATUS: false,
  //   EMAIL: "",
  // });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
