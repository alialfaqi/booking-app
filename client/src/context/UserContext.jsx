import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(undefined);

export function UserContextProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      const token = cookies.UserToken;
      console.log(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
