// filepath: src/context/UserContextProvider.jsx
import React, { useState, useEffect } from "react";
import { UserDataContext } from "./userContext"; // 👈 small 'u'
import { getUserProfile } from "../utility/apiCall";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log("User not logged in or session expired");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
