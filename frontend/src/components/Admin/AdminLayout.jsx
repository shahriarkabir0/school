// AdminLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-64 w-full transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;