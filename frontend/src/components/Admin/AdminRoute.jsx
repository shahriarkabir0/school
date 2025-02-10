import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchProfile from "../../utils/fetchProfile";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const profile = await fetchProfile();
        console.log(profile);
        if (profile.role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Access Denied:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : null;
};

export default AdminRoute;
