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
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile API response:", res.data);

        // अगर response.data.user है तो:
        if (res.status === 200) {
          setUser(res.data.user || res.data); // दोनों case handle
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Auth Error:", error.message);
        localStorage.removeItem("token");
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
