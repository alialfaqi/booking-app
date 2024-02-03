import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(undefined);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    !user && axios.get("/profile");
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
