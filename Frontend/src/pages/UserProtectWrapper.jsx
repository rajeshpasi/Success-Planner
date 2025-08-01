import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          { withCredentials: true }
        );

        console.log("Profile API response:", res.data);

        const user = res.data.user || res.data;
        if (res.status === 200 && user) {
          setUser(user);
        } else {
          throw new Error("Authentication failed: User data not found in response.");
        }
      } catch (error) {
        console.error("Auth Check Error:", error.response?.data?.message || error.message);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuth();
  }, [navigate, setUser]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
