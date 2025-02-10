import React, { useState, useEffect } from "react";
import { FiUpload, FiDownload, FiFile, FiEye, FiX, FiTrash2 } from "react-icons/fi";
import axiosInstance from "../../utils/axiosInstance";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NoticeUpload = () => {
  const [file, setFile] = useState(null);
  const [notices, setNotices] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/notices`, { withCredentials: true });
      setNotices(res.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await axiosInstance.post(`${API_BASE_URL}/notices/upload`, formData,{ withCredentials:true });
      alert("File uploaded successfully!");
      setFile(null);
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`${API_BASE_URL}/notices/${id}`,{ withCredentials:true });
      alert("Notice deleted successfully!");
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Error deleting notice");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  return (
<div className="p-4 md:p-6 justify-center text-center w-full md:max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Upload & View Notices</h2>

      {/* Drag & Drop Upload Box */}
      <div
        className={`border-2 border-dashed ${
          dragging ? "border-blue-500" : "border-gray-300"
        } rounded-lg p-4 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FiUpload className="text-4xl md:text-5xl text-gray-500 mb-3 md:mb-4" />
        <p className="text-gray-600 text-sm md:text-base">Drag & Drop a PDF file here</p>
        <p className="text-gray-400 text-xs md:text-sm">or</p>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} id="fileInput" />
        <label
          htmlFor="fileInput"
          className="mt-3 px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition text-sm md:text-base"
        >
          Select File
        </label>
      </div>

      {/* Selected File & Upload Button */}
      {file && (
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-gray-200 p-2 md:p-3 rounded-lg shadow">
          <span className="text-gray-700 text-sm md:text-base">{file.name}</span>
          <button
            onClick={handleUpload}
            className="mt-2 md:mt-0 px-3 py-1 md:px-4 md:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm md:text-base"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* Notices List */}
      <h3 className="text-xl md:text-2xl font-semibold mt-5 md:mt-6 mb-3">Uploaded Notices</h3>
      <ul className="space-y-2">
        {notices.length === 0 ? (
          <p className="text-gray-600 text-sm md:text-base">No notices uploaded yet.</p>
        ) : (
          notices.map((notice) => (
            <li
              key={notice._id}
              className="flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-2">
                <FiFile className="text-lg md:text-xl text-gray-500" />
                <span className="truncate text-sm md:text-base">{notice.title}</span>
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => setSelectedPdf(notice.pdfUrl)}
                  className="px-3 py-1 md:px-4 md:py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm md:text-base flex items-center gap-1 md:gap-2"
                >
                  <FiEye /> Preview
                </button>

                <a
                  href={notice.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 md:px-4 md:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm md:text-base flex items-center gap-1 md:gap-2"
                >
                  <FiDownload /> Download
                </a>

                <button
                  onClick={() => handleDelete(notice._id)}
                  className="px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm md:text-base flex items-center gap-1 md:gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* PDF Viewer Section */}
      {selectedPdf && (
        <div className="mt-5 md:mt-6 p-3 md:p-4 border rounded-lg shadow-lg bg-gray-100 relative">
          <button
            onClick={() => setSelectedPdf(null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 md:p-2 rounded-full hover:bg-red-600 transition"
          >
            <FiX size={16} />
          </button>

          <h3 className="text-lg md:text-xl font-semibold mb-2">PDF Preview</h3>
          <div className="w-full h-[300px] md:h-[500px] border rounded-lg overflow-hidden">
            <iframe
              src={`https://docs.google.com/gview?url=${selectedPdf}&embedded=true`}
              className="w-full h-full"
              title="PDF Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeUpload;
