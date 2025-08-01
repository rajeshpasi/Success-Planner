import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const faviconUrl = "/favicon.png";

const LoginForm = () => {
  const [email, setEmail] = useState("rezero@gm.com");
  const [password, setPassword] = useState("pasi12345");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const {user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      rememberMe: remember,
    };
    // Clear previous error
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      userData
      );

      const { user } = res.data;
      // Set user in context
      setUser(user);
      alert("Login successful!");

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setRemember(false);
  };

   // Google Login Handler
  const responseGoogle = async (authResult) =>{
    try {
      if (authResult.code) {
         await axios.get(
          `${import.meta.env.VITE_API_URL}/google?code=${authResult.code}`,
          { withCredentials: true } // cookie allow करो
        );
        console.log(authResult);     

        // redirect
        navigate('/home');
      } else {
        console.error("No code received from Google:", authResult);
      }
    } catch (error) {
      console.error("Google Login Error:", error.response?.data || error.message);
    }
  }
  const handleGoogleLogin = useGoogleLogin({
   onSuccess: responseGoogle,
   onError: responseGoogle,
   flow: "auth-code",
});


  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-500">
      <div className="bg-white px-10 py-10 rounded-xl shadow-lg min-w-[360px]">
        <div className="flex flex-col items-center mb-8">
          <img
            src={faviconUrl}
            alt="Logo"
            className="w-25 h-25 mb-2 rounded-full shadow-md"
          />
          <h2 className="m-0 font-semibold text-2xl">Welcome to Success Planner</h2>
          <h5>Sign in to continue to your planner</h5>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1.5">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                type="checkbox"
                id="remember"
                className="mr-2"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded font-semibold text-lg hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center mt-5 gap-4">
          <button
            onClick={handleGoogleLogin}
            className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            {/* <span>Login with Google</span> */}
          </button>
          <button
            onClick={handleGoogleLogin}
            className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              className="w-6 h-6"
              src="https://cdn-icons-png.flaticon.com/256/25/25231.png"
              loading="lazy"
              alt="github logo"
            />
            {/* <span>Login with GitHub</span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
