import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from "../context/userContext"; // 👈 small 'u'
import { useGoogleLogin } from "@react-oauth/google";

const faviconUrl = "/favicon.png";
const RegisterForm = () => {
  // State for form fields (if needed)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: { // Capital 'N'
        firstName, // Capital 'F'
        lastName,  // Capital 'L'
      },
      email,
      password,
      confirmPassword,
      terms,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, newUser,
        { withCredentials: true } // cookie allow करो
      );
      const data = response.data
      // Set user data in context
      setUser(data.user);
      navigate('/home'); // Redirect to home page after successful registration
      alert("Registration successful! Welcome to Success Planner.");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  
     // Google Login Handler
  const responseGoogle = async (authResult) =>{
    try {
      if (authResult.code) {
         await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/google?code=${authResult.code}`,
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
    <div className='min-h-screen bg-indigo-500 flex items-center justify-center px-4'>
      <div className='w-full max-w-xl bg-white rounded-2xl shadow-lg p-8'>
       <div className="flex flex-col items-center mb-8">
          <img
            src={faviconUrl}
            alt="Logo"
            className="w-25 h-25 mb-2 rounded-full shadow-md"
          />
          <h2 className="m-0 font-semibold text-2xl">Welcome to Success Planner</h2>
          <h5>Sign in to continue to your planner</h5>
        </div>

        <form onSubmit={(e) => {
          handleSubmit(e)
        }} className="space-y-4">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium text-gray-700">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter First Name"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-medium text-gray-700">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter Last Name"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Terms and Conditions */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 font-semibold'>
          <div className="flex items-center ">
            <input
              value={terms}
              onChange={(e) => setTerms(e.target.checked)}
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the terms and conditions
            </label>
            </div> 
            <div className="text-sm text-gray-600 ">
            <Link to="/login" className="text-blue-600 hover:text-violet-600">Already have an account? Login</Link>
          </div>
          </div>
          

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>
        {/* Social Media Icons */}
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

export default RegisterForm;
