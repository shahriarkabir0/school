import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Upload, FileText } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}

      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 w-2/3 bg-gray-900 text-white z-50 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform shadow-lg`
            : "w-64 h-screen bg-gray-900 text-white fixed p-6 shadow-lg"
        }`}
      >
        {isMobile && (
          <button
            className="absolute top-4 right-4 p-3 text-white hover:bg-gray-700 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>
        )}
        <h2 className="text-xl font-bold mb-6 px-6 mt-7">Admin Dashboard</h2>
        <ul className="px-10">
          <li className="mb-4 flex items-center">
            <LayoutDashboard className="mr-2" size={20} />
            <Link to="/admin" className="block p-2 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <Upload className="mr-2" size={20} />
            <Link to="/admin/upload" className="block p-2 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              Notice Upload
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <FileText className="mr-2" size={20} />
            <Link to="/admin/documents" className="block p-2 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              View PDFs
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
