// filepath: src/context/UserContextProvider.jsx
import React, { useState } from "react";
import { UserDataContext } from "./userContext"; // 👈 small 'u'

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;