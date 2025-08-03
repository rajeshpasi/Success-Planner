import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
            <div className="flex items-center gap-2">
                <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-full" />
                <span className="font-bold text-xl text-indigo-700">Success Planner</span>
            </div>
            <button
                className="md:hidden text-indigo-700"
                onClick={() => setOpen(!open)}
                aria-label="Toggle Sidebar"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>


        </div>
    </nav>
  );
}

export default Navbar;