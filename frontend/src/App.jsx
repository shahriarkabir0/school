import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Layout from "./components/Layout/Layout"; // Adjust the path as needed
import Notice from "./components/Notice";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Admin/AdminRoute";
import NoticeUpload from "./pages/Admin/NoticeUpload";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
        
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/notice" element={<Layout><Notice /></Layout>} />
        

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

       
        
          <Route path="/admin" element={ <AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/admin/upload" element={ <AdminRoute><AdminLayout><NoticeUpload /></AdminLayout></AdminRoute>} />
        

        </Routes>
    </BrowserRouter>
  );
}

export default App;
