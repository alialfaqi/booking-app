import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(undefined);

export function UserContextProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken"]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      const token = cookies.UserToken;
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, [cookies.UserToken]);

  const logOut = () => {
    localStorage.removeItem("logged");
    removeCookie("UserToken");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
