import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`bg-white shadow-lg min-h-screen w-64 p-4 fixed top-0 left-0 z-30 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-full" />
        <span className="font-bold text-xl text-indigo-700">Success Planner</span>
      </div>
      {/* Main Links */}
      <nav className="flex flex-col gap-4">
        <span className="text-xs font-semibold text-gray-400 mb-2">MAIN</span>
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <span>📊</span> Dashboard
        </Link>
        <Link to="/yearly" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <span>📅</span> Yearly Planner
        </Link>
        <Link to="/monthly" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <span>🗓️</span> Monthly Planner
        </Link>
        <Link to="/weekly" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <span>📆</span> Weekly Planner
        </Link>
        <Link to="/todo" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <span>✅</span> Todo List
        </Link>
        <span className="text-xs font-semibold text-gray-400 mt-6 mb-2">ACCOUNT</span>
        <Link to="/logout" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <span>🚪</span> Logout
        </Link>
      </nav>
      {/* User Info */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <img src="/user.png" alt="User" className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-semibold text-gray-700">John Doe</div>
          <div className="text-xs text-gray-500">john@example.com</div>
        </div>
      </div>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-indigo-700"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Sidebar"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
    </aside>
  );
};

export default Sidebar;