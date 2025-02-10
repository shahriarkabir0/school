import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import fetchProfile from "../utils/fetchProfile"; // Import the utility function
import axiosInstance from "../utils/axiosInstance"; // Import axiosInstance

function Profile() {
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const getProfile = async () => {
        try {
          const profile = await fetchProfile();
          console.log(profile);
          setUser(profile);
          setIsLoggedIn(true);
        } catch (err) {
          if (err.message === "No token found" || err.response?.status === 401) {
            navigate("/login");
          } else {
            console.error(err);
          }
        }
      };

      getProfile();
    }
  }, [navigate, user, setUser, setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  if (!user) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          <strong className="font-medium">Username:</strong>{" "}
          <span className="ml-2">{user.username}</span>
        </p>

        <p className="text-gray-700">
          <strong className="font-medium">Email:</strong>{" "}
          <span className="ml-2">{user.email}</span>
        </p>

        <p className="text-gray-700">
          <strong className="font-medium">Joined:</strong>{" "}
          <span className="ml-2">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
