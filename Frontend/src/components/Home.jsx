import React from "react";
import { LayoutDashboard, Calendar, List, LogOut, Bell, Settings } from "lucide-react";

import { Link } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center h-16 border-b">
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 mr-2" />
            <span className="text-xl font-bold">Success Planner</span>
          </div>
          <nav className="p-4 text-gray-700">
            <p className="uppercase text-xs text-gray-500 mb-2">Main</p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/yearly-planner"
                  className="flex items-center p-2 bg-blue-100 text-blue-700 rounded"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Yearly Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/monthly-planner"
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Monthly Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/weekly-planner"
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Weekly Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/todo"
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <List className="w-4 h-4 mr-2" />
                  Todo List
                </Link>
              </li>
            </ul>

            <p className="uppercase text-xs text-gray-500 mt-4 mb-2">Account</p>
            <ul>
              <li>
                <Link
                  to="/logout"
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.pravatar.cc/30"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-semibold">Yearly Planner</h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
            <Settings className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default SidebarLayout;
