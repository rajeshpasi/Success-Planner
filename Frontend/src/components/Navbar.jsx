import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const routeName = () => {
    const path = window.location.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1) || "Dashboard";
  };

  return (
    <nav>
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-full" />
          <span
            className='hidden md:block ml-52 text-gray-600 text-md font-bold'
          >
            {routeName()}
          </span>
        </div>

        <div className="hidden md:block text-gray-600">
            <i className="fa-solid fa-bell mr-4"></i>
            <i className="fa-solid fa-gear"></i>
        </div>

        <button
          className="md:hidden text-indigo-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
