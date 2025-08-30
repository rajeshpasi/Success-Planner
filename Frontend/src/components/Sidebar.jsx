import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PlusIcon } from "./icons/SimpleIcons";
import { UserDataContext } from "../context/userContext";

const Sidebar = ({ onCreatePlannerClick }) => {
  const [open] = useState(false);
  const location = useLocation();
  const { user, loading } = useContext(UserDataContext);
  const isActive = (path) => location.pathname === path;

  // Get user's full name
  const getUserName = () => {
    if (!user) return "Guest User";
    if (user.fullName) {
      return `${user.fullName.firstName} ${user.fullName.lastName}`.trim();
    }
    return user.email || "User";
  };

  // Get user's avatar
  const getUserAvatar = () => {
    if (user?.Picture) return user.Picture;
    if (user?.picture) return user.picture;
    return "https://i.pravatar.cc/150?img=1";
  };

  return (
    <aside
      className={`bg-white shadow-lg min-h-screen w-64 fixed top-0 left-0 z-30 transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 border-b-2 border-gray-200 pb-5 p-4">
        <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-full" />
        <span className="font-bold text-lg text-indigo-700">
          Success Planner
        </span>
      </div>
      {/* Main Links */}
      <nav className="flex flex-col gap-4 p-4">
        <span className="text-xs font-semibold text-gray-400 mb-2">MAIN</span>
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 ${
            isActive("/dashboard") ? "text-indigo-600" : ""
          }`}
        >
          <i
            className={`fas fa-chart-line mr-3 ${
              isActive("/dashboard") ? "text-indigo-600" : "text-gray-400"
            }`}
          ></i>{" "}
          Dashboard
        </Link>
        <Link
          to="/yearly"
          className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 ${
            isActive("/yearly") ? "text-indigo-600" : ""
          }`}
        >
          <i
            className={`fas fa-calendar-alt mr-3 ${
              isActive("/yearly") ? "text-indigo-600" : "text-gray-400"
            }`}
          ></i>{" "}
          Yearly Planner
        </Link>
        <Link
          to="/monthly"
          className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 ${
            isActive("/monthly") ? "text-indigo-600" : ""
          }`}
        >
          <i
            className={`fas fa-calendar-day mr-3 ${
              isActive("/monthly") ? "text-indigo-600" : "text-gray-400"
            }`}
          ></i>{" "}
          Monthly Planner
        </Link>
        <Link
          to="/weekly"
          className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 ${
            isActive("/weekly") ? "text-indigo-600" : ""
          }`}
        >
          <i
            className={`fas fa-calendar-week mr-3 ${
              isActive("/weekly") ? "text-indigo-600" : "text-gray-400"
            }`}
          ></i>{" "}
          Weekly Planner
        </Link>
        <Link
          to="/todo"
          className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 ${
            isActive("/todo") ? "text-indigo-600" : ""
          }`}
        >
          <i
            className={`fas fa-list mr-3 ${
              isActive("/todo") ? "text-indigo-600" : "text-gray-400"
            }`}
          ></i>{" "}
          Todo List
        </Link>

        {/* Create New Planner Button */}
        <button
          onClick={onCreatePlannerClick}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 mt-4 w-full"
        >
          <PlusIcon className="w-4 h-4" color="white" />
          Create New Planner
        </button>

        <span className="text-xs font-semibold text-gray-400 mt-6 mb-2">
          ACCOUNT
        </span>
        <Link
          to="/logout"
          className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 ${
            isActive("/logout") ? "text-indigo-600" : ""
          }`}
        >
          <i
            className={`fas fa-sign-out-alt mr-3 ${
              isActive("/logout") ? "text-indigo-600" : "text-gray-400"
            }`}
          ></i>{" "}
          Logout
        </Link>
      </nav>
      {/* Profile Info */}
      {!loading && (
        <div className="flex items-center gap-2 p-4 border-t-2 border-gray-100 mt-40">
          <img
            src={getUserAvatar()}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">{getUserName()}</p>
            <p className="text-xs text-gray-500">
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
